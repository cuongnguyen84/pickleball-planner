import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// Import the single elimination bracket component from the library.  The
// project already includes @g-loot/react-tournament-brackets as a dependency.
import { SingleEliminationBracket, createTheme } from "@g-loot/react-tournament-brackets";

/*
 * This file builds a React component to render the knockout stage
 * using the @g-loot/react-tournament-brackets library.  The logic
 * reuses much of the existing knockout.js code to compute which
 * players qualify for the knockout and how they should be paired.  It
 * then transforms that structure into the format expected by the
 * bracket component.  For now the component is read‑only; it reads
 * scores from localStorage (ko_scores) to determine winners and
 * highlight them, but it does not provide an interface to edit
 * scores.  Score editing can remain in the existing knockout page or
 * be implemented later.
 */

// Utility: deep copy an object to avoid accidental mutation.
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Read bracket data and previously computed scores from localStorage.
function loadState() {
  const brackets = JSON.parse(localStorage.getItem("bracket_brackets") || "[]");
  const scheduleScores = JSON.parse(localStorage.getItem("schedule_scores") || "[]");
  const knockoutState = JSON.parse(localStorage.getItem("knockout_state") || "{}\n");
  const koScores = JSON.parse(localStorage.getItem("ko_scores") || "{}\n");
  const numPlayers = parseInt(localStorage.getItem("bracket_numPlayers") || "0", 10);
  const numCourts = parseInt(localStorage.getItem("bracket_numCourts") || "0", 10);
  return { brackets, scheduleScores, knockoutState, koScores, numPlayers, numCourts };
}

/*
 * The functions below are copies of logic from knockout.js.  They
 * compute the standings (BXH) for each round‑robin bracket, derive
 * which players advance to the knockout stage, and pair them
 * according to tournament rules.  Keeping the algorithms here
 * ensures that the React bracket shows the same matchups as the
 * original page.
 */

// Compute standings (BXH) for all brackets based on saved schedule scores.
function getBXHAll(brackets, scheduleScores) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const bxhs = [];
  brackets.forEach((bracket, idx) => {
    const n = bracket.players.length;
    const rows = bracket.players.map((p, i) => ({
      name: p.name,
      team: p.team,
      idx: i,
      bracketIdx: idx,
      win: 0,
      lose: 0,
      point: 0,
      scoreFor: 0,
      scoreAgainst: 0,
    }));
    for (let i = 0; i < n; ++i) {
      for (let j = i + 1; j < n; ++j) {
        const match = scheduleScores.find((m) => {
          return (
            ((m.p1 === bracket.players[i].name && m.p2 === bracket.players[j].name) ||
              (m.p2 === bracket.players[i].name && m.p1 === bracket.players[j].name)) &&
            m.bracket === alphabet[idx]
          );
        });
        if (match && match.score1 !== "" && match.score2 !== "") {
          // Determine scores from perspective of player i
          const s1 = Number(match.p1 === bracket.players[i].name ? match.score1 : match.score2);
          const s2 = Number(match.p2 === bracket.players[j].name ? match.score2 : match.score1);
          rows[i].scoreFor += s1;
          rows[i].scoreAgainst += s2;
          rows[j].scoreFor += s2;
          rows[j].scoreAgainst += s1;
          if (s1 > s2) {
            rows[i].win++;
            rows[j].lose++;
            rows[i].point++;
          } else if (s2 > s1) {
            rows[j].win++;
            rows[i].lose++;
            rows[j].point++;
          }
        }
      }
    }
    // Sort rows: points desc, goal difference desc, goals for desc.
    rows.sort((a, b) => {
      return (
        b.point - a.point ||
        (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) ||
        b.scoreFor - a.scoreFor
      );
    });
    bxhs.push(rows);
  });
  return bxhs;
}

// Determine which players advance to the knockout.  The rules here
// mirror the original knockout.js.  The number of brackets and number
// of advancing teams determine how many players from each round
// qualify.  Returns an array of objects: {name, team, pos, bracket, point, scoreFor, scoreAgainst}.
function getKOPlayers(brackets, scheduleScores, numTeams) {
  const bxhs = getBXHAll(brackets, scheduleScores);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nBrackets = brackets.length;
  const totalPlayers = bxhs.reduce((a, b) => a + b.length, 0);
  // Helper to deep copy and annotate with bracket letter and position
  function annotate(arr, bracketIdx, labels) {
    return arr.map((row, i) => {
      return {
        name: row.name,
        team: row.team,
        pos: labels[i] || '',
        bracket: alphabet[bracketIdx],
        point: row.point,
        scoreFor: row.scoreFor,
        scoreAgainst: row.scoreAgainst,
      };
    });
  }
  // 2 brackets
  if (nBrackets === 2) {
    if (numTeams === 4) {
      return [
        ...annotate(bxhs[0].slice(0, 2), 0, ['Nhất', 'Nhì']),
        ...annotate(bxhs[1].slice(0, 2), 1, ['Nhất', 'Nhì']),
      ];
    }
    if (numTeams === 8) {
      return [
        ...annotate(bxhs[0].slice(0, 4), 0, ['Nhất', 'Nhì', 'Ba', 'Tư']),
        ...annotate(bxhs[1].slice(0, 4), 1, ['Nhất', 'Nhì', 'Ba', 'Tư']),
      ];
    }
  }
  // 3 brackets
  if (nBrackets === 3) {
    if (numTeams === 4) {
      // Top two from A, B, C sorted by performance
      const nhats = [0, 1, 2].map((i) => ({ ...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất', bx: i }));
      nhats.sort((a, b) => b.point - a.point || (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
      const nhis = [0, 1, 2].map((i) => ({ ...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì', bx: i }));
      nhis.sort((a, b) => b.point - a.point || (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
      // cặp 1: top 'Nhất' vs best 'Nhì' not same bracket
      const c1_p1 = nhats[0];
      const c1_p2 = nhis.find((n) => n.bx !== c1_p1.bx) || nhis[0];
      // cặp 2: two remaining 'Nhất'
      const leftNhats = nhats.filter((n) => n.name !== c1_p1.name);
      return [c1_p1, c1_p2, leftNhats[0], leftNhats[1]];
    }
    if (numTeams === 8) {
      // Nhất và Nhì từ mỗi bảng + hai Ba xuất sắc nhất
      const nhats = [0, 1, 2].map((i) => ({ ...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất' }));
      const nhis = [0, 1, 2].map((i) => ({ ...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì' }));
      const bas = [0, 1, 2].map((i) => ({ ...bxhs[i][2], bracket: alphabet[i], pos: 'Ba' }));
      bas.sort((a, b) => b.point - a.point || (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
      const best3 = [bas[0], bas[1]];
      let pairs = [];
      const used = new Set();
      // Nhất vs Ba nếu khác bracket, else vs Nhì
      for (const n1 of nhats) {
        const ba = best3.find((b) => !used.has(b.name) && b.bracket !== n1.bracket);
        if (ba) {
          pairs.push(n1, ba);
          used.add(n1.name);
          used.add(ba.name);
        } else {
          const nhi = nhis.find((n) => !used.has(n.name) && n.bracket !== n1.bracket);
          if (nhi) {
            pairs.push(n1, nhi);
            used.add(n1.name);
            used.add(nhi.name);
          }
        }
      }
      const allPlayers = [...nhats, ...nhis, ...best3];
      const remain = allPlayers.filter((p) => !used.has(p.name));
      // Pair remaining players arbitrarily
      for (let i = 0; i < remain.length; i += 2) {
        if (remain[i + 1]) {
          pairs.push(remain[i], remain[i + 1]);
        }
      }
      return pairs;
    }
  }
  // 4 brackets
  if (nBrackets === 4) {
    if (numTeams === 4) {
      // Only winners advance
      return [
        { ...bxhs[0][0], bracket: alphabet[0], pos: 'Nhất' },
        { ...bxhs[1][0], bracket: alphabet[1], pos: 'Nhất' },
        { ...bxhs[2][0], bracket: alphabet[2], pos: 'Nhất' },
        { ...bxhs[3][0], bracket: alphabet[3], pos: 'Nhất' },
      ];
    }
    if (numTeams === 8) {
      // Top 2 from each bracket
      const result = [];
      for (let i = 0; i < 4; i++) {
        result.push({ ...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất' });
        result.push({ ...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì' });
      }
      return result;
    }
    if (numTeams === 16) {
      // Top 4 from each bracket
      const result = [];
      for (let i = 0; i < 4; i++) {
        result.push(
          { ...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất' },
          { ...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì' },
          { ...bxhs[i][2], bracket: alphabet[i], pos: 'Ba' },
          { ...bxhs[i][3], bracket: alphabet[i], pos: 'Tư' },
        );
      }
      return result;
    }
  }
  // Default fallback: flatten first n players from each bracket until enough
  const flat = [];
  let i = 0;
  while (flat.length < numTeams) {
    for (let b = 0; b < bxhs.length; b++) {
      if (bxhs[b][i]) {
        flat.push({ ...bxhs[b][i], bracket: alphabet[b], pos: `${i + 1}` });
        if (flat.length === numTeams) break;
      }
    }
    i++;
  }
  return flat;
}

// Generate the first round matchups for knockout based on the
// tournament rules.  Returns an array of objects {p1, p2, desc}.
function genKOMatches(brackets, scheduleScores, numTeams) {
  const koPlayers = getKOPlayers(brackets, scheduleScores, numTeams);
  const nBrackets = brackets.length;
  const matches = [];
  // The following cases mirror those in knockout.js
  if (nBrackets === 2 && numTeams === 4) {
    const A = koPlayers.filter((x) => x.bracket === 'A');
    const B = koPlayers.filter((x) => x.bracket === 'B');
    matches.push({ p1: A[0], p2: B[1], desc: 'Nhất A - Nhì B' });
    matches.push({ p1: B[0], p2: A[1], desc: 'Nhất B - Nhì A' });
  } else if (nBrackets === 2 && numTeams === 8) {
    const A = koPlayers.filter((x) => x.bracket === 'A');
    const B = koPlayers.filter((x) => x.bracket === 'B');
    matches.push({ p1: A[0], p2: B[3], desc: 'Nhất A - Tư B' });
    matches.push({ p1: A[1], p2: B[2], desc: 'Nhì A - Ba B' });
    matches.push({ p1: B[0], p2: A[3], desc: 'Nhất B - Tư A' });
    matches.push({ p1: B[1], p2: A[2], desc: 'Nhì B - Ba A' });
  } else if (nBrackets === 3 && numTeams === 4) {
    // koPlayers already in correct pairing order
    matches.push({ p1: koPlayers[0], p2: koPlayers[1], desc: `${koPlayers[0].pos} ${koPlayers[0].bracket} - ${koPlayers[1].pos} ${koPlayers[1].bracket}` });
    matches.push({ p1: koPlayers[2], p2: koPlayers[3], desc: `${koPlayers[2].pos} ${koPlayers[2].bracket} - ${koPlayers[3].pos} ${koPlayers[3].bracket}` });
  } else if (nBrackets === 3 && numTeams === 8) {
    // koPlayers in order p0,p1,p2,p3,p4,p5,p6,p7
    for (let i = 0; i < 8; i += 2) {
      matches.push({ p1: koPlayers[i], p2: koPlayers[i + 1], desc: `${koPlayers[i].pos} ${koPlayers[i].bracket} - ${koPlayers[i + 1].pos} ${koPlayers[i + 1].bracket}` });
    }
  } else if (nBrackets === 4 && numTeams === 4) {
    // Pair winners of A vs C and B vs D
    matches.push({ p1: koPlayers[0], p2: koPlayers[2], desc: 'Nhất A - Nhất C' });
    matches.push({ p1: koPlayers[1], p2: koPlayers[3], desc: 'Nhất B - Nhất D' });
  } else if (nBrackets === 4 && numTeams === 8) {
    const A = koPlayers.filter((x) => x.bracket === 'A');
    const B = koPlayers.filter((x) => x.bracket === 'B');
    const C = koPlayers.filter((x) => x.bracket === 'C');
    const D = koPlayers.filter((x) => x.bracket === 'D');
    matches.push({ p1: A[0], p2: B[1], desc: 'Nhất A - Nhì B' });
    matches.push({ p1: C[0], p2: D[1], desc: 'Nhất C - Nhì D' });
    matches.push({ p1: B[0], p2: A[1], desc: 'Nhất B - Nhì A' });
    matches.push({ p1: D[0], p2: C[1], desc: 'Nhất D - Nhì C' });
  } else if (nBrackets === 4 && numTeams === 16) {
    // Straight pairing: first vs last etc.
    for (let i = 0; i < 16; i += 2) {
      matches.push({ p1: koPlayers[i], p2: koPlayers[15 - i], desc: '' });
    }
  } else if (nBrackets === 5 && numTeams === 8) {
    for (let i = 0; i < 8; i += 2) {
      matches.push({ p1: koPlayers[i], p2: koPlayers[i + 1], desc: `${koPlayers[i].pos} ${koPlayers[i].bracket} - ${koPlayers[i + 1].pos} ${koPlayers[i + 1].bracket}` });
    }
  } else if (nBrackets === 5 && numTeams === 16) {
    for (let i = 0; i < 16; i += 2) {
      matches.push({ p1: koPlayers[i], p2: koPlayers[i + 1], desc: `${koPlayers[i].pos} ${koPlayers[i].bracket} - ${koPlayers[i + 1].pos} ${koPlayers[i + 1].bracket}` });
    }
  } else {
    // Fallback: simple sequential pairing
    for (let i = 0; i < koPlayers.length; i += 2) {
      if (koPlayers[i + 1]) matches.push({ p1: koPlayers[i], p2: koPlayers[i + 1], desc: '' });
    }
  }
  return matches;
}

// Read knockout scores from localStorage and return result for matchId
function getKoResult(koScores, matchId) {
  return koScores[matchId] || { score1: '', score2: '' };
}

// Determine winner for a match given players and result.  Returns the
// winning player object or null if result is incomplete or a draw.
function getWinner(p1, p2, result) {
  if (!p1 || !p2) return null;
  const s1 = result.score1 === '' ? null : Number(result.score1);
  const s2 = result.score2 === '' ? null : Number(result.score2);
  if (s1 === null || s2 === null) return null;
  if (s1 > s2) return p1;
  if (s2 > s1) return p2;
  return null;
}

// Build matches array in the format expected by SingleEliminationBracket.
function buildBracketMatches(brackets, scheduleScores, koScores, numTeams) {
  // First round matches
  const round0 = genKOMatches(brackets, scheduleScores, numTeams);
  // Determine total rounds (log2) based on number of participants
  const totalRounds = Math.ceil(Math.log2(round0.length * 2));
  // roundLabels similar to renderBracket for display
  const roundLabelsMap = {
    4: ['Vòng 1/8', 'Tứ kết', 'Bán kết', 'Chung kết'],
    3: ['Tứ kết', 'Bán kết', 'Chung kết'],
    2: ['Bán kết', 'Chung kết'],
    1: ['Chung kết'],
  };
  const roundLabels = roundLabelsMap[totalRounds] || [];
  // Build nested rounds array similar to knockout.js
  const rounds = [];
  rounds.push(round0.map((m, i) => {
    return { p1: m.p1, p2: m.p2, desc: m.desc, matchId: `R0_${i}` };
  }));
  for (let r = 1; r < totalRounds; r++) {
    const prev = rounds[r - 1];
    const next = [];
    for (let i = 0; i < prev.length; i += 2) {
      const matchId1 = prev[i].matchId;
      const matchId2 = prev[i + 1] ? prev[i + 1].matchId : null;
      const winner1 = getWinner(prev[i].p1, prev[i].p2, getKoResult(koScores, matchId1));
      const winner2 = matchId2 ? getWinner(prev[i + 1].p1, prev[i + 1].p2, getKoResult(koScores, matchId2)) : null;
      const label = matchId2 ? `Thắng ${roundLabels[r - 1]} ${i + 1}` : 'Bye';
      next.push({ p1: winner1 || { name: label }, p2: winner2 || { name: label }, desc: '', matchId: `R${r}_${Math.floor(i / 2)}` });
    }
    rounds.push(next);
  }
  // Flatten rounds into match objects for the bracket component.
  const matches = [];
  for (let r = 0; r < rounds.length; r++) {
    const round = rounds[r];
    for (let i = 0; i < round.length; i++) {
      const match = round[i];
      // Determine nextMatchId: matches in last round have none
      let nextMatchId = null;
      if (r < rounds.length - 1) {
        nextMatchId = rounds[r + 1][Math.floor(i / 2)].matchId;
      }
      // Determine participants and their score/winner status
      const res = getKoResult(koScores, match.matchId);
      // Each participant needs id and name; id can be the name or unique index.
      const participants = [];
      if (match.p1) {
        participants.push({
          id: `${match.matchId}_p1`,
          name: match.p1.name,
          resultText: res.score1 || null,
          isWinner: res.score1 !== '' && res.score2 !== '' && Number(res.score1) > Number(res.score2),
          status: res.score1 === '' || res.score2 === '' ? null : 'PLAYED',
        });
      } else {
        participants.push({ id: `${match.matchId}_p1`, name: 'TBD', resultText: null, isWinner: false, status: null });
      }
      if (match.p2) {
        participants.push({
          id: `${match.matchId}_p2`,
          name: match.p2.name,
          resultText: res.score2 || null,
          isWinner: res.score1 !== '' && res.score2 !== '' && Number(res.score2) > Number(res.score1),
          status: res.score1 === '' || res.score2 === '' ? null : 'PLAYED',
        });
      } else {
        participants.push({ id: `${match.matchId}_p2`, name: 'TBD', resultText: null, isWinner: false, status: null });
      }
      matches.push({
        id: match.matchId,
        name: `Match ${match.matchId}`,
        nextMatchId: nextMatchId,
        nextLooserMatchId: null,
        tournamentRoundText: roundLabels[r] || '',
        startTime: null,
        state: res.score1 === '' || res.score2 === '' ? 'SCHEDULED' : 'SCORE_DONE',
        participants,
      });
    }
  }
  return matches;
}

// The main component displayed in knockout-react.html.  It reads the
// knockout configuration from localStorage (number of teams to
// advance), builds the match objects, and renders the bracket.
function KnockoutBracket() {
  const [matches, setMatches] = useState([]);
  const [numTeams, setNumTeams] = useState(() => {
    const state = JSON.parse(localStorage.getItem('knockout_state') || '{}');
    return state.numTeams || 4;
  });
  // Recompute the bracket whenever numTeams or scores change.
  useEffect(() => {
    // Listen for storage changes in other tabs/windows
    const handler = () => {
      const { brackets, scheduleScores, koScores } = loadState();
      const m = buildBracketMatches(brackets, scheduleScores, koScores, numTeams);
      setMatches(m);
    };
    handler();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [numTeams]);
  // Theme customization: match the light gray backgrounds of the original
  const theme = createTheme({
    textColor: '#374151',
    matchBackground: '#f9fafb',
    borderRadius: 8,
    score: {
      background: '#e5e7eb',
      color: '#374151',
    },
    connector: {
      color: '#9ca3af',
      thickness: 1,
    },
  });
  return (
    <div style={{ overflowX: 'auto' }}>
      <SingleEliminationBracket
        matches={matches}
        theme={theme}
        // Disable match click by default
        onMatchClick={() => {}}
      />
    </div>
  );
}

// Mount the React component to the page.  The container element
// `koBracketReact` should be present in knockout.html.
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('koBracketReact');
  if (root) {
    ReactDOM.render(<KnockoutBracket />, root);
  }
});