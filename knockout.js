const brackets = JSON.parse(localStorage.getItem('bracket_brackets') || '[]');
const savedKo = JSON.parse(localStorage.getItem('knockout_state') || '{}');
const scheduleScores = JSON.parse(localStorage.getItem('schedule_scores') || '[]');
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// === BXH từng bảng (chỉ lấy hạng, ko cần điểm số chi tiết) ===
function getBXHAll() {
  const bxhs = [];
  brackets.forEach((bracket, idx) => {
    const n = bracket.players.length;
    const rows = bracket.players.map((p, i) => ({
      name: p.name, team: p.team, idx: i, bracketIdx: idx,
      win: 0, lose: 0, point: 0, scoreFor: 0, scoreAgainst: 0,
    }));
    for (let i = 0; i < n; ++i) for (let j = i+1; j < n; ++j) {
      let match = scheduleScores.find(m =>
        ((m.p1 === bracket.players[i].name && m.p2 === bracket.players[j].name) ||
         (m.p2 === bracket.players[i].name && m.p1 === bracket.players[j].name))
        && m.bracket === alphabet[idx]
      );
      if (match && match.score1 !== "" && match.score2 !== "") {
        let s1 = Number(match.p1 === bracket.players[i].name ? match.score1 : match.score2);
        let s2 = Number(match.p2 === bracket.players[j].name ? match.score2 : match.score1);
        rows[i].scoreFor += s1; rows[i].scoreAgainst += s2;
        rows[j].scoreFor += s2; rows[j].scoreAgainst += s1;
        if (s1 > s2) { rows[i].win++; rows[j].lose++; rows[i].point++; }
        else { rows[j].win++; rows[i].lose++; rows[j].point++; }
      }
    }
    rows.sort((a, b) => b.point - a.point ||
      (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) ||
      b.scoreFor - a.scoreFor
    );
    bxhs.push(rows);
  });
  return bxhs;
}

// === UI dropdown chọn số đội vào KO ===
function renderSetupDropdown() {
  let nBrackets = brackets.length;
  let bxhs = getBXHAll();
  let totalPlayers = bxhs.reduce((a, b) => a + b.length, 0);
  let koChoices = [];
  if (nBrackets === 2) {
    koChoices = (totalPlayers >= 10) ? [4,8] : [4];
  } else if (nBrackets === 4) {
    koChoices = (totalPlayers >= 16) ? [4,8,16] : (totalPlayers>=8?[4,8]:[4]);
  } else if (nBrackets === 3) {
    koChoices = (totalPlayers >= 8) ? [4,8] : [4];
  } else if ([5,6,7,8].includes(nBrackets)) {
    koChoices = (totalPlayers >= 16) ? [8,16] : [8];
  }
  if (koChoices.length === 0) {
    document.getElementById('koSetup').innerHTML = '<div class="text-red-600 py-6 text-center font-bold">Không đủ số VĐV để vào vòng Knockout.</div>';
    return;
  }
  let savedNum = savedKo.numTeams || koChoices[0];
  document.getElementById('koSetup').innerHTML = `
    <div class="mb-3 flex gap-3 items-center">
      <label for="koNum" class="ko-label">Số đội vào Knockout:</label>
      <select id="koNum" class="ko-dropdown">
        ${koChoices.map(n => `<option value="${n}" ${savedNum==n?'selected':''}>${n}</option>`).join('')}
      </select>
      <button class="ko-btn" id="btnKoGen">Xác nhận</button>
    </div>
  `;
  document.getElementById('btnKoGen').onclick = () => {
    let num = Number(document.getElementById('koNum').value);
    localStorage.setItem('knockout_state', JSON.stringify({ numTeams: num }));
    renderBracket(num);
  }
  // Render lần đầu
  renderBracket(savedNum);
}

// ==== SINH DANH SÁCH ĐỘI VÀO KO VÀ GHÉP CẶP CỨNG ====
function getKOPlayers(numTeams) {
  const bxhs = getBXHAll();
  // Chuẩn hóa: trả về [{name, bracket, pos, ...}]
  if (brackets.length === 2) {
    if (numTeams === 4)
      return [
        {...bxhs[0][0], bracket:'A', pos:'Nhất'}, {...bxhs[0][1], bracket:'A', pos:'Nhì'},
        {...bxhs[1][0], bracket:'B', pos:'Nhất'}, {...bxhs[1][1], bracket:'B', pos:'Nhì'},
      ];
    if (numTeams === 8)
      return [
        ...[0,1,2,3].map(i=>({...bxhs[0][i], bracket:'A', pos:["Nhất","Nhì","Ba","Tư"][i]})),
        ...[0,1,2,3].map(i=>({...bxhs[1][i], bracket:'B', pos:["Nhất","Nhì","Ba","Tư"][i]})),
      ];
  }
  if (brackets.length === 4) {
    if (numTeams === 4)
      return [0,1,2,3].map(i=>({...bxhs[i][0], bracket:alphabet[i], pos:'Nhất'}));
    if (numTeams === 8)
      return [0,1,2,3].flatMap(i=>[
        {...bxhs[i][0], bracket:alphabet[i], pos:'Nhất'},
        {...bxhs[i][1], bracket:alphabet[i], pos:'Nhì'}
      ]);
    if (numTeams === 16)
      return [0,1,2,3].flatMap(i=>
        [0,1,2,3].map(j=>({...bxhs[i][j], bracket:alphabet[i], pos:["Nhất","Nhì","Ba","Tư"][j]}))
      );
  }
  // 3 bảng: lấy cứng như bạn mô tả
  if (brackets.length === 3) {
    if (numTeams === 4) {
      // nhất, nhì mỗi bảng, lấy nhất thành tích cao nhất gặp nhì thành tích cao nhất
      let nhats = [0,1,2].map(i=>({...bxhs[i][0], bracket:alphabet[i], pos:'Nhất', bx:i}));
      nhats.sort((a,b)=>b.point-a.point);
      let nhat1 = nhats[0], nhat2 = nhats[1], nhat3 = nhats[2];
      let nhis = [0,1,2].map(i=>({...bxhs[i][1], bracket:alphabet[i], pos:'Nhì', bx:i}));
      nhis.sort((a,b)=>b.point-a.point);
      let nhi1 = nhis[0], nhi2 = nhis[1], nhi3 = nhis[2];
      return [nhat1, nhi1, nhat2, nhat3];
    }
    if (numTeams === 8) {
      let res = [];
      for (let i=0; i<3; ++i) for (let j=0; j<2; ++j) res.push({...bxhs[i][j], bracket:alphabet[i], pos:j==0?'Nhất':'Nhì'});
      let hang3 = [0,1,2].map(i=>({...bxhs[i][2], bracket:alphabet[i], pos:'Ba'}));
      hang3.sort((a,b)=>b.point-a.point);
      res.push(hang3[0], hang3[1]);
      return res;
    }
  }
  // 5,6,7,8 bảng
  if ([5,6,7,8].includes(brackets.length)) {
    let perTable = Math.floor(numTeams / brackets.length);
    let arr = [];
    for (let i=0;i<brackets.length;++i)
      for (let j=0;j<perTable;++j)
        arr.push({...bxhs[i][j], bracket:alphabet[i], pos:j==0?'Nhất':j==1?'Nhì':`Top${j+1}`});
    let left = numTeams-arr.length;
    if (left>0) {
      let hang3s = [];
      for (let i=0;i<brackets.length;++i) if (bxhs[i][2])
        hang3s.push({...bxhs[i][2], bracket:alphabet[i], pos:'Ba'});
      hang3s.sort((a,b)=>b.point-a.point);
      arr = arr.concat(hang3s.slice(0,left));
    }
    return arr;
  }
  return [];
}

// ==== GHÉP CẶP THEO QUY TẮC CỐ ĐỊNH ====
function genKOMatches(numTeams, koPlayers) {
  let matches = [];
  if (brackets.length === 2 && numTeams === 4) {
    let A = koPlayers.filter(x=>x.bracket==='A').sort((a,b)=>a.pos.localeCompare(b.pos));
    let B = koPlayers.filter(x=>x.bracket==='B').sort((a,b)=>a.pos.localeCompare(b.pos));
    matches = [
      {p1: {...A[0]}, p2: {...B[1]}, desc:`Nhất A - Nhì B`},
      {p1: {...B[0]}, p2: {...A[1]}, desc:`Nhất B - Nhì A`}
    ];
  } else if (brackets.length === 2 && numTeams === 8) {
    let A = koPlayers.filter(x=>x.bracket==='A').sort((a,b)=>a.pos.localeCompare(b.pos));
    let B = koPlayers.filter(x=>x.bracket==='B').sort((a,b)=>a.pos.localeCompare(b.pos));
    matches = [
      {p1: {...A[0]}, p2: {...B[3]}, desc:`Nhất A - Tư B`},
      {p1: {...A[1]}, p2: {...B[2]}, desc:`Nhì A - Ba B`},
      {p1: {...B[0]}, p2: {...A[3]}, desc:`Nhất B - Tư A`},
      {p1: {...B[1]}, p2: {...A[2]}, desc:`Nhì B - Ba A`}
    ];
  } else if (brackets.length === 4 && numTeams === 4) {
    let ps = koPlayers;
    matches = [
      {p1: {...ps[0]}, p2: {...ps[2]}, desc:`Nhất A - Nhất C`},
      {p1: {...ps[1]}, p2: {...ps[3]}, desc:`Nhất B - Nhất D`}
    ];
  } else if (brackets.length === 4 && numTeams === 8) {
    let A = koPlayers.filter(x=>x.bracket==='A');
    let B = koPlayers.filter(x=>x.bracket==='B');
    let C = koPlayers.filter(x=>x.bracket==='C');
    let D = koPlayers.filter(x=>x.bracket==='D');
    matches = [
      {p1: {...A[0]}, p2: {...B[1]}, desc:`Nhất A - Nhì B`},
      {p1: {...C[0]}, p2: {...D[1]}, desc:`Nhất C - Nhì D`},
      {p1: {...B[0]}, p2: {...A[1]}, desc:`Nhất B - Nhì A`},
      {p1: {...D[0]}, p2: {...C[1]}, desc:`Nhất D - Nhì C`}
    ];
  }
  // ... (Có thể bổ sung tương tự cho các case 3 bảng, 8 bảng theo quy tắc cứng của bạn)
  else {
    // fallback: ghép 1 vs n, 2 vs n-1, ... (phòng ngừa)
    let arr = [...koPlayers];
    for (let i=0;i<arr.length/2;++i)
      matches.push({p1:arr[i], p2:arr[arr.length-1-i], desc:""});
  }
  return matches;
}

// ==== VẼ BRACKET & GIAO DIỆN ====
function renderBracket(numTeams) {
  let koPlayers = getKOPlayers(numTeams);
  let qf = genKOMatches(numTeams, koPlayers);
  let html = '';
  // Tứ kết / Bán kết / Chung kết
  if (qf.length >= 4) html += `<div class="ko-section"><div class="ko-title">Tứ kết:</div>
    ${qf.map((m,i)=>`
      <div class="ko-match">
        <span class="ko-seed">${i+1}</span>
        <span class="ko-player">${m.p1.name} <span style="color:#888; font-size:0.97em;">(${m.p1.pos} ${m.p1.bracket})</span></span>
        <input class="ko-score" type="number" min="0" max="99"/>
        <span class="ko-sep">-</span>
        <input class="ko-score" type="number" min="0" max="99"/>
        <span class="ko-player">${m.p2.name} <span style="color:#888; font-size:0.97em;">(${m.p2.pos} ${m.p2.bracket})</span></span>
        <button class="ko-btn">Lưu điểm</button>
      </div>
    `).join('')}
  </div>`;
  // Bán kết
  if (qf.length === 4) {
    html += `<div class="ko-section"><div class="ko-title">Bán kết:</div>
      <div class="ko-match"><span class="ko-seed">BK1</span> Thắng cặp 1 <span class="ko-sep">-</span> Thắng cặp 4</div>
      <div class="ko-match"><span class="ko-seed">BK2</span> Thắng cặp 2 <span class="ko-sep">-</span> Thắng cặp 3</div>
    </div>
    <div class="ko-section"><div class="ko-title">Chung kết:</div>
      <div class="ko-match"><span class="ko-seed">CK</span> Thắng BK1 <span class="ko-sep">-</span> Thắng BK2</div>
    </div>`;
  } else if (qf.length === 2) {
    html += `<div class="ko-section"><div class="ko-title">Chung kết:</div>
      <div class="ko-match"><span class="ko-seed">CK</span> Thắng BK1 <span class="ko-sep">-</span> Thắng BK2</div>
    </div>`;
  }
  document.getElementById('koBracket').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', renderSetupDropdown);
