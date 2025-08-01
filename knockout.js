// knockout.js

const brackets = JSON.parse(localStorage.getItem('bracket_brackets') || '[]');
const savedKo = JSON.parse(localStorage.getItem('knockout_state') || '{}');
const scheduleScores = JSON.parse(localStorage.getItem('schedule_scores') || '[]');
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// Lưu/truy xuất điểm trận knockout
function saveKoResult(matchId, score1, score2) {
  let scores = JSON.parse(localStorage.getItem('ko_scores') || '{}');
  scores[matchId] = {score1, score2};
  localStorage.setItem('ko_scores', JSON.stringify(scores));
}
function getKoResult(matchId) {
  let scores = JSON.parse(localStorage.getItem('ko_scores') || '{}');
  return scores[matchId] || {score1:'', score2:''};
}
function getWinner(p1, p2, matchId) {
  let result = getKoResult(matchId);
  if (result.score1 === '' || result.score2 === '') return null;
  let s1 = Number(result.score1), s2 = Number(result.score2);
  if (s1 > s2) return p1;
  if (s2 > s1) return p2;
  return { name: "(Hòa)", pos: '', bracket: '' };
}


// --- Tính BXH các bảng ---
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

// --- UI chọn số đội vào KO ---
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
      <label for="koNum" class="ko-label font-bold text-blue-700">Số đội vào Knockout:</label>
      <select id="koNum" class="ko-dropdown border px-3 py-2 rounded-md">
        ${koChoices.map(n => `<option value="${n}" ${savedNum==n?'selected':''}>${n}</option>`).join('')}
      </select>
      <button class="ko-btn bg-blue-600 hover:bg-blue-700 text-white font-bold rounded px-6 py-2" id="btnKoGen">Xác nhận</button>
    </div>
  `;
  document.getElementById('btnKoGen').onclick = () => {
  let num = Number(document.getElementById('koNum').value);
  localStorage.removeItem('ko_scores'); // <-- THÊM DÒNG NÀY
  localStorage.setItem('knockout_state', JSON.stringify({ numTeams: num }));
  renderBracket(num);
}

  renderBracket(savedNum);
}

// --- Lấy đội vào KO ---
function getKOPlayers(numTeams) {
  const bxhs = getBXHAll();
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
  ////3 bảng
  if (brackets.length === 3 && numTeams === 4) {
  let nhats = [0,1,2].map(i => ({...bxhs[i][0], bracket:alphabet[i], pos:'Nhất', bx:i}));
  nhats.sort((a,b) => b.point-a.point || (b.scoreFor-b.scoreAgainst)-(a.scoreFor-a.scoreAgainst) || b.scoreFor-a.scoreFor);
  let nhis = [0,1,2].map(i => ({...bxhs[i][1], bracket:alphabet[i], pos:'Nhì', bx:i}));
  nhis.sort((a,b) => b.point-a.point || (b.scoreFor-b.scoreAgainst)-(a.scoreFor-a.scoreAgainst) || b.scoreFor-a.scoreFor);

  // Cặp 1: Nhất mạnh nhất gặp nhì xuất sắc nhất không cùng bảng
  let c1_p1 = nhats[0];
  let c1_p2 = nhis.find(n => n.bx !== c1_p1.bx) || nhis[0];

  // Cặp 2: Hai đội Nhất còn lại ghép nhau
  let leftNhats = nhats.filter(n => n.name !== c1_p1.name);
  // Nếu còn lại đúng 2 đội thì ghép cặp, nếu vì lý do gì trùng thì cứ lấy 2 đội còn lại
  let c2_p1 = leftNhats[0];
  let c2_p2 = leftNhats[1];

  // Trả về đúng thứ tự 4 đội vào 2 cặp
  return [c1_p1, c1_p2, c2_p1, c2_p2];
}

  if (brackets.length === 3 && numTeams === 8) {
  // Lấy Nhất/Nhì mỗi bảng + 2 hạng 3 xuất sắc nhất
  let nhats = [0,1,2].map(i => ({...bxhs[i][0], bracket:alphabet[i], pos:'Nhất'}));
  let nhis  = [0,1,2].map(i => ({...bxhs[i][1], bracket:alphabet[i], pos:'Nhì'}));
  let bas   = [0,1,2].map(i => ({...bxhs[i][2], bracket:alphabet[i], pos:'Ba'}));
  bas.sort((a,b) => b.point-a.point || (b.scoreFor-b.scoreAgainst)-(a.scoreFor-a.scoreAgainst) || b.scoreFor-a.scoreFor);
  let best3 = [bas[0], bas[1]];

  let usedNames = new Set();
  let pairs = [];

  // Bước 1: Nhất gặp Ba xuất sắc khác bảng (nếu còn), nếu không thì gặp Nhì khác bảng
  for (let i = 0; i < nhats.length; ++i) {
    let n1 = nhats[i];
    // Tìm Ba xuất sắc nhất chưa dùng, khác bảng
    let baIdx = best3.findIndex(ba => !usedNames.has(ba.name) && ba.bracket !== n1.bracket);
    if (baIdx !== -1) {
      let ba = best3[baIdx];
      pairs.push([n1, ba]);
      usedNames.add(n1.name); usedNames.add(ba.name);
      continue;
    }
    // Nếu không có Ba phù hợp, ghép với Nhì khác bảng, chưa dùng
    let nhiIdx = nhis.findIndex(nhi => !usedNames.has(nhi.name) && nhi.bracket !== n1.bracket);
    if (nhiIdx !== -1) {
      let nhi = nhis[nhiIdx];
      pairs.push([n1, nhi]);
      usedNames.add(n1.name); usedNames.add(nhi.name);
      continue;
    }
  }

  // Bước 2: Tìm các đội còn lại chưa ghép
  let allPlayers = [].concat(nhats, nhis, best3);
  let remain = allPlayers.filter(p => !usedNames.has(p.name));

  // Nếu còn 4 đội sót lại, ưu tiên ghép không cùng bảng, nếu không thì cứ ghép theo thứ tự
  if (remain.length === 4) {
    // Ghép 2 cặp còn lại, ưu tiên không cùng bảng
    let [a, b, c, d] = remain;
    // Ưu tiên a-b khác bảng
    if (a.bracket !== b.bracket) pairs.push([a, b]), pairs.push([c, d]);
    else if (a.bracket !== c.bracket) pairs.push([a, c]), pairs.push([b, d]);
    else pairs.push([a, d]), pairs.push([b, c]);
  } else if (remain.length === 2) {
    pairs.push([remain[0], remain[1]]);
  }

  // Trả về thứ tự đúng cho hàm genKOMatches
  return pairs.flat();
}



//4 bảng
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
  // 5 bảng
  if (brackets.length === 5 && numTeams === 8) {
    let nhats = [0,1,2,3,4].map(i => ({...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất', bx: i}));
    let allNhi = [0,1,2,3,4].map(i => ({...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì', bx: i}));
    allNhi.sort((a,b) => b.point - a.point || (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
    // Chọn top 3 nhì xuất sắc nhất (không cùng bảng với nhau)
    let nhis = [];
    let usedBrackets = new Set();
    for (let nhi of allNhi) {
        if (!usedBrackets.has(nhi.bracket)) {
            nhis.push(nhi);
            usedBrackets.add(nhi.bracket);
        }
        if (nhis.length === 3) break;
    }

    // Ghép cặp chuẩn theo yêu cầu
    let pairs = [];
    let usedNhats = new Set();
    let usedNhis = new Set();

    // Ghép từng nhất với nhì không cùng bảng
    for (let i = 0; i < nhats.length; ++i) {
        let n1 = nhats[i];
        let idx = nhis.findIndex(nhi => nhi.bracket !== n1.bracket && !usedNhis.has(nhi.name));
        if (idx !== -1) {
            pairs.push([n1, nhis[idx]]);
            usedNhats.add(n1.name);
            usedNhis.add(nhis[idx].name);
        }
    }

    // Lấy đội còn lại (có thể là 2 nhất, 1 nhất 1 nhì hoặc 2 nhì)
    let nhatsLeft = nhats.filter(n1 => !usedNhats.has(n1.name));
    let nhisLeft = nhis.filter(nhi => !usedNhis.has(nhi.name));

    // Nếu còn 2 đội, ghép luôn cặp cuối
    if (nhatsLeft.length + nhisLeft.length === 2) {
        let remain = [...nhatsLeft, ...nhisLeft];
        pairs.push([remain[0], remain[1]]);
    }

    // Xuất thứ tự cặp cho genKOMatches
    return pairs.flat();
}


  if (brackets.length === 5 && numTeams === 16) {
    // Chuẩn hóa dữ liệu
    let nhats = [0,1,2,3,4].map(i => ({...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất', bx: i}));
    let nhis  = [0,1,2,3,4].map(i => ({...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì', bx: i}));
    let bas   = [0,1,2,3,4].map(i => ({...bxhs[i][2], bracket: alphabet[i], pos: 'Ba', bx: i}));
    let tus   = [0,1,2,3,4].map(i => bxhs[i][3]).filter(Boolean)
        .map((row,i) => ({...row, bracket: alphabet[i], pos: 'Tư', bx: i}));

    // Chỉ lấy 1 đội tư xuất sắc nhất
    tus.sort((a,b) => b.point-a.point || (b.scoreFor-b.scoreAgainst)-(a.scoreFor-a.scoreAgainst) || b.scoreFor-a.scoreFor);
    let best4 = tus[0] ? [tus[0]] : [];

    // Danh sách 16 đội
    let koPlayers = [...nhats, ...nhis, ...bas, ...best4];

    // Ghép 5 nhất bảng với các đội tư/ba xuất sắc nhất, không cùng bảng
    let usedNames = new Set();
    let pairs = [];
    let basSort = [...bas].sort((a,b) => b.point-a.point || (b.scoreFor-b.scoreAgainst)-(a.scoreFor-a.scoreAgainst) || b.scoreFor-a.scoreFor);

    for (let nhat of nhats) {
        // Tìm đội hạng 4 chưa dùng, không cùng bảng
        let tu = best4.find(t => !usedNames.has(t.name) && t.bx !== nhat.bx);
        if (tu) {
            pairs.push([nhat, tu]);
            usedNames.add(nhat.name); usedNames.add(tu.name);
            continue;
        }
        // Nếu không còn tư, ghép với ba xuất sắc nhất còn lại, không cùng bảng
        let baIdx = basSort.findIndex(b => !usedNames.has(b.name) && b.bx !== nhat.bx);
        if (baIdx !== -1) {
            let ba = basSort[baIdx];
            pairs.push([nhat, ba]);
            usedNames.add(nhat.name); usedNames.add(ba.name);
            continue;
        }
    }
    // Ghép các cặp còn lại random, ưu tiên không cùng bảng
    let allPlayers = [...nhats, ...nhis, ...bas, ...best4];
    let remain = allPlayers.filter(p => !usedNames.has(p.name));
    while (remain.length > 1) {
        let a = remain[0];
        let b = remain.find(x => x.bx !== a.bx) || remain[1];
        pairs.push([a, b]);
        usedNames.add(a.name); usedNames.add(b.name);
        remain = remain.filter(x => !usedNames.has(x.name));
    }
    return pairs.flat();
}
  if (brackets.length === 6 && numTeams === 8) {
  // 1. Lấy 6 đội nhất bảng + 2 nhì xuất sắc nhất
  let nhats = [0,1,2,3,4,5].map(i => ({
    ...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất', bx: i
  }));
  let nhis = [0,1,2,3,4,5].map(i => ({
    ...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì', bx: i
  }));
  nhis.sort((a, b) => 
    b.point - a.point ||
    (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) ||
    b.scoreFor - a.scoreFor
  );
  let best2Nhi = [nhis[0], nhis[1]];

  // 2. Gộp 8 đội rồi đánh seed theo hệ số thành tích vòng bảng
  let koList = [...nhats, ...best2Nhi];
  koList.forEach((p, i) => { p.__originIdx = i; }); // backup index nếu cần swap lại

  // 3. Sort lại thứ tự seed từ mạnh đến yếu (seed 1 đầu bảng, seed 8 cuối bảng)
  koList.sort((a, b) =>
    b.point - a.point ||
    (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) ||
    b.scoreFor - a.scoreFor
  );
  // Gán seed từ 1 -> 8
  koList.forEach((p, i) => p.seed = i + 1);

  // 4. Ghép seed 1 vs seed 8, seed 2 vs seed 7,... và KHÔNG cùng bảng
  let pairs = [];
  let used = new Set();

  // Tạo list tạm để check swap
  let temp = koList.slice();
  for (let i = 0; i < 4; i++) {
    let a = temp[i], b = temp[7 - i];
    // Nếu cùng bảng thì swap với cặp tiếp theo (ưu tiên fix)
    if (a.bracket === b.bracket) {
      // Tìm seed khác bảng để swap (tìm từ cuối lên cho chắc)
      let swapIdx = 7 - i - 1;
      while (swapIdx > i) {
        let c = temp[swapIdx];
        if (a.bracket !== c.bracket && temp[i].bracket !== temp[swapIdx].bracket) {
          [temp[7 - i], temp[swapIdx]] = [temp[swapIdx], temp[7 - i]];
          b = temp[7 - i];
          break;
        }
        swapIdx--;
      }
      // Nếu vẫn trùng thì thôi, đành giữ
    }
    pairs.push([a, b]);
    used.add(a.name); used.add(b.name);
  }

  // 5. Trả về đúng thứ tự 8 đội thành 4 cặp (phẳng mảng)
  return pairs.flat();
}
if (brackets.length === 6 && numTeams === 16) {
  // 6 nhất, 6 nhì, 4 ba xuất sắc nhất
  let nhats = [0,1,2,3,4,5].map(i => ({
    ...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất', bx: i
  }));
  let nhis = [0,1,2,3,4,5].map(i => ({
    ...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì', bx: i
  }));
  let bas = [0,1,2,3,4,5].map(i => ({
    ...bxhs[i][2], bracket: alphabet[i], pos: 'Ba', bx: i
  }));
  // Chọn 4 ba xuất sắc nhất
  bas.sort((a,b) => b.point-a.point || (b.scoreFor-b.scoreAgainst)-(a.scoreFor-a.scoreAgainst) || b.scoreFor-a.scoreFor);
  let bestBa = bas.slice(0, 4);

  // Đánh số hạt giống dựa trên điểm vòng bảng (điều này là option, có thể seed khi render)
  let koPlayers = [...nhats, ...nhis, ...bestBa];
  koPlayers.forEach((p,i) => { p.seed = i+1; }); // Nếu muốn seed dựa trên vị trí vào KO, có thể sort trước!

  return koPlayers;
}
    // Trường hợp 7 bảng lấy 8 đội
if (brackets.length === 7 && numTeams === 8) {
  let nhats = [0,1,2,3,4,5,6].map(i => ({
    ...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất', bx: i
  }));
  let allNhi = [0,1,2,3,4,5,6].map(i => ({
    ...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì', bx: i
  }));
  // Chọn 1 nhì xuất sắc nhất
  allNhi.sort((a,b) => b.point - a.point || (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
  let bestNhi = allNhi[0];

  let koPlayers = [...nhats, bestNhi];

  // Random hóa các cặp sao cho 2 đội cùng bảng rơi 2 nhánh khác nhau
  // Đánh số hạt giống theo điểm vòng bảng
  koPlayers.sort((a,b) => b.point - a.point || (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor);
  // Tạo mảng cặp
  let pairs = [];
  let used = new Set();

  // Ghép Nhất bảng với Nhì xuất sắc không cùng bảng nếu có
  let nhi = bestNhi;
  for (let i = 0; i < nhats.length; i++) {
    if (nhats[i].bx !== nhi.bx) {
      pairs.push([nhats[i], nhi]);
      used.add(nhats[i].name);
      used.add(nhi.name);
      break;
    }
  }
  // Các nhất còn lại chưa dùng ghép thành cặp (random, ưu tiên khác bảng)
  let remain = nhats.filter(x => !used.has(x.name));
  while (remain.length) {
    let p1 = remain.shift();
    let idx = remain.findIndex(x => x.bx !== p1.bx);
    let p2;
    if (idx === -1) {
      p2 = remain.shift();
    } else {
      p2 = remain.splice(idx,1)[0];
    }
    pairs.push([p1,p2]);
  }
  return pairs.flat();
}

// Trường hợp 7 bảng lấy 16 đội
if (brackets.length === 7 && numTeams === 16) {
  // Lấy danh sách nhất, nhì, ba các bảng
  let nhats = [];
  let nhis = [];
  let bas = [];
  for (let i = 0; i < 7; i++) {
    nhats.push({ ...bxhs[i][0], bracket: alphabet[i], pos: 'Nhất', bx: i });
    nhis.push({ ...bxhs[i][1], bracket: alphabet[i], pos: 'Nhì', bx: i });
    bas.push({ ...bxhs[i][2], bracket: alphabet[i], pos: 'Ba', bx: i });
  }

  // Chọn 2 đội hạng 3 xuất sắc nhất
  bas.sort((a, b) => 
    b.point - a.point || 
    (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) || 
    b.scoreFor - a.scoreFor
  );
  let bestBa = bas.slice(0, 2);

  // Gộp toàn bộ 16 đội
  let koPlayers = [...nhats, ...nhis, ...bestBa];

  // Gán seed theo thứ tự ưu tiên
  // Seed 1-7: nhats (theo điểm và hiệu số vòng bảng)
  nhats.sort((a, b) =>
    b.point - a.point ||
    (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) ||
    b.scoreFor - a.scoreFor
  );
  // Seed 8-14: nhis (cũng sort điểm hiệu số)
  nhis.sort((a, b) =>
    b.point - a.point ||
    (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) ||
    b.scoreFor - a.scoreFor
  );
  // Seed 15-16: bestBa (đã sort bên trên)

  // Xếp seed cho từng nhóm
  nhats.forEach((p, i) => p.seed = i + 1);
  nhis.forEach((p, i) => p.seed = i + 8);
  bestBa.forEach((p, i) => p.seed = i + 15);

  return koPlayers;
}







  // 8 bảng
  if (brackets.length===8) {
    if (numTeams===8)
      return [0,1,2,3,4,5,6,7].map(i=>({...bxhs[i][0], bracket:alphabet[i], pos:'Nhất'}));
    if (numTeams===16)
      return [0,1,2,3,4,5,6,7].flatMap(i=>[
        {...bxhs[i][0], bracket:alphabet[i], pos:'Nhất'},
        {...bxhs[i][1], bracket:alphabet[i], pos:'Nhì'}
      ]);
  }
  return [];
}

// --- Ghép cặp KO ---
// Ghép đúng quy tắc cứng, không trùng bảng vòng đầu, demo một số trường hợp phổ biến
function genKOMatches(numTeams, koPlayers) {
  let matches = [];
  // 2 bảng
  if (brackets.length === 2 && numTeams === 4) {
    let A = koPlayers.filter(x=>x.bracket==='A').sort((a,b)=>a.pos.localeCompare(b.pos));
    let B = koPlayers.filter(x=>x.bracket==='B').sort((a,b)=>a.pos.localeCompare(b.pos));
    matches = [
      {p1: {...A[0]}, p2: {...B[1]}, desc:`Nhất A - Nhì B`},
      {p1: {...B[0]}, p2: {...A[1]}, desc:`Nhất B - Nhì A`}
    ];
  } else if (brackets.length === 2 && numTeams === 8) {
    let A = koPlayers.filter(x=>x.bracket==='A');
    let B = koPlayers.filter(x=>x.bracket==='B');
    matches = [
      {p1: {...A[0]}, p2: {...B[3]}, desc:`Nhất A - Tư B`},
      {p1: {...A[1]}, p2: {...B[2]}, desc:`Nhì A - Ba B`},
      {p1: {...B[0]}, p2: {...A[3]}, desc:`Nhất B - Tư A`},
      {p1: {...B[1]}, p2: {...A[2]}, desc:`Nhì B - Ba A`}
    ];
  }
  // 3 bảng
// 3 bảng, lấy 4 đội KO
else if (brackets.length === 3 && numTeams === 4) {
  matches = [
    { p1: koPlayers[0], p2: koPlayers[1], desc: `${koPlayers[0].pos} ${koPlayers[0].bracket} - ${koPlayers[1].pos} ${koPlayers[1].bracket}` },
    { p1: koPlayers[2], p2: koPlayers[3], desc: `${koPlayers[2].pos} ${koPlayers[2].bracket} - ${koPlayers[3].pos} ${koPlayers[3].bracket}` }
  ];
}

// 3 bảng, lấy 8 đội KO
else if (brackets.length === 3 && numTeams === 8) {
  matches = [
    { p1: koPlayers[0], p2: koPlayers[1], desc: `${koPlayers[0].pos} ${koPlayers[0].bracket} - ${koPlayers[1].pos} ${koPlayers[1].bracket}` },
    { p1: koPlayers[2], p2: koPlayers[3], desc: `${koPlayers[2].pos} ${koPlayers[2].bracket} - ${koPlayers[3].pos} ${koPlayers[3].bracket}` },
    { p1: koPlayers[4], p2: koPlayers[5], desc: `${koPlayers[4].pos} ${koPlayers[4].bracket} - ${koPlayers[5].pos} ${koPlayers[5].bracket}` },
    { p1: koPlayers[6], p2: koPlayers[7], desc: `${koPlayers[6].pos} ${koPlayers[6].bracket} - ${koPlayers[7].pos} ${koPlayers[7].bracket}` }
  ];
}


  // 4 bảng
  else if (brackets.length === 4 && numTeams === 4) {
    let ps = koPlayers;
    matches = [
      {p1: {...ps[0]}, p2: {...ps[2]}, desc:`Nhất A - Nhất C`},
      {p1: {...ps[1]}, p2: {...ps[3]}, desc:`Nhất B - Nhất D`}
    ];
  }
  else if (brackets.length === 4 && numTeams === 8) {
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
  else if (brackets.length === 4 && numTeams === 16) {
    // 16 đội chia đều từ mỗi bảng
    let arr = koPlayers;
    for (let i=0;i<8;++i) matches.push({p1: arr[i], p2: arr[15-i], desc:""});
  }
  // 5 bảng — random nhất bảng gặp random các đội khác bảng (ưu tiên theo mô tả)
  else if (brackets.length === 5 && numTeams === 8) {
  // koPlayers đã đúng thứ tự [cặp1_p1, cặp1_p2, ...]
  matches = [
    { p1: koPlayers[0], p2: koPlayers[1], desc: `${koPlayers[0].pos} ${koPlayers[0].bracket} - ${koPlayers[1].pos} ${koPlayers[1].bracket}` },
    { p1: koPlayers[2], p2: koPlayers[3], desc: `${koPlayers[2].pos} ${koPlayers[2].bracket} - ${koPlayers[3].pos} ${koPlayers[3].bracket}` },
    { p1: koPlayers[4], p2: koPlayers[5], desc: `${koPlayers[4].pos} ${koPlayers[4].bracket} - ${koPlayers[5].pos} ${koPlayers[5].bracket}` },
    { p1: koPlayers[6], p2: koPlayers[7], desc: `${koPlayers[6].pos} ${koPlayers[6].bracket} - ${koPlayers[7].pos} ${koPlayers[7].bracket}` }
  ];
}
  else if (brackets.length === 5 && numTeams === 16) {
  // koPlayers đã đúng thứ tự [cặp1_p1, cặp1_p2, cặp2_p1, cặp2_p2, ...]
  matches = [];
  for (let i=0; i<16; i+=2) {
    matches.push({
      p1: koPlayers[i],
      p2: koPlayers[i+1],
      desc: `${koPlayers[i].pos} ${koPlayers[i].bracket} - ${koPlayers[i+1].pos} ${koPlayers[i+1].bracket}`
    });
  }
}

else if (brackets.length === 6 && numTeams === 16) {
  // Lấy ra các nhóm
  let nhats = koPlayers.filter(x => x.pos === 'Nhất');
  let nhis = koPlayers.filter(x => x.pos === 'Nhì');
  let bas  = koPlayers.filter(x => x.pos === 'Ba');

  // Chọn 4 ba xuất sắc nhất
  bas.sort((a,b) => b.point-a.point || (b.scoreFor-b.scoreAgainst)-(a.scoreFor-a.scoreAgainst) || b.scoreFor-a.scoreFor);
  let bestBa = bas.slice(0, 4);

  let used = new Set();
  let matches = [];

  // 6 nhất bảng sẽ lần lượt ghép 4 ba xuất sắc nhất (ưu tiên không cùng bảng)
  for (let i = 0; i < nhats.length; i++) {
    let n1 = nhats[i];
    let baIdx = bestBa.findIndex(b => !used.has(b.name) && b.bracket !== n1.bracket);
    if (baIdx !== -1 && matches.length < 4) {
      let b = bestBa[baIdx];
      matches.push({ p1: n1, p2: b, desc: `${n1.pos} ${n1.bracket} - ${b.pos} ${b.bracket}` });
      used.add(n1.name); used.add(b.name);
    }
  }

  // Đã đủ 4 cặp rồi, còn lại là các đội nhất bảng chưa dùng
  let remainNhats = nhats.filter(n => !used.has(n.name));
  let remainNhis  = nhis.filter(n => !used.has(n.name));
  // 2 đội nhất bảng còn lại gặp 2 nhì (không cùng bảng)
  for (let i = 0; i < remainNhats.length; i++) {
    let n1 = remainNhats[i];
    let nhiIdx = remainNhis.findIndex(nhi => nhi.bracket !== n1.bracket && !used.has(nhi.name));
    if (nhiIdx !== -1) {
      let n2 = remainNhis[nhiIdx];
      matches.push({ p1: n1, p2: n2, desc: `${n1.pos} ${n1.bracket} - ${n2.pos} ${n2.bracket}` });
      used.add(n1.name); used.add(n2.name);
    }
  }
  // Các cặp còn lại: random giữa các nhì bảng còn lại (không cùng bảng) nếu có thể
  let left = koPlayers.filter(p => !used.has(p.name));
  // Ghép random (ưu tiên khác bảng)
  while (left.length > 1) {
    let p1 = left[0];
    let p2idx = left.findIndex(x => x.bracket !== p1.bracket);
    let p2 = p2idx !== -1 ? left[p2idx] : left[1];
    matches.push({ p1, p2, desc: `${p1.pos} ${p1.bracket} - ${p2.pos} ${p2.bracket}` });
    left = left.filter(x => x.name !== p1.name && x.name !== p2.name);
  }
  return matches; // <- đúng chuẩn, mảng 8 trận, mỗi trận {p1, p2, desc}
}

if (brackets.length === 7 && numTeams === 16) {
  // Lấy từng nhóm
  let nhats = koPlayers.filter(x => x.pos === 'Nhất');
  let nhis = koPlayers.filter(x => x.pos === 'Nhì');
  let bas = koPlayers.filter(x => x.pos === 'Ba');

  // Chọn 2 ba xuất sắc nhất
  let bestBa = [...bas].sort((a,b) =>
    b.point - a.point || (b.scoreFor - b.scoreAgainst) - (a.scoreFor - a.scoreAgainst) || b.scoreFor - a.scoreFor
  ).slice(0, 2);

  let used = new Set();
  let matches = [];

  // Bước 1: Random 1 trong 7 nhất bảng gặp 1 trong 2 ba xuất sắc nhất, KHÔNG cùng bảng
  let shuffledNhats = shuffle(nhats);
  let shuffledBas = shuffle(bestBa);

  for (let ba of shuffledBas) {
    let n1Idx = shuffledNhats.findIndex(n => n.bracket !== ba.bracket && !used.has(n.name));
    if (n1Idx !== -1) {
      let n1 = shuffledNhats[n1Idx];
      matches.push({ p1: n1, p2: ba, desc: `${n1.pos} ${n1.bracket} - ${ba.pos} ${ba.bracket}` });
      used.add(n1.name);
      used.add(ba.name);
      shuffledNhats.splice(n1Idx, 1);
    }
  }

  // Bước 2: Các nhất bảng còn lại gặp nhì bảng KHÁC bảng (không cùng bảng)
  let remainNhats = shuffledNhats.filter(n => !used.has(n.name));
  let remainNhis = nhis.filter(n => !used.has(n.name));

  for (let n1 of remainNhats) {
    let nhiIdx = remainNhis.findIndex(n => n.bracket !== n1.bracket && !used.has(n.name));
    if (nhiIdx !== -1) {
      let n2 = remainNhis[nhiIdx];
      matches.push({ p1: n1, p2: n2, desc: `${n1.pos} ${n1.bracket} - ${n2.pos} ${n2.bracket}` });
      used.add(n1.name);
      used.add(n2.name);
      remainNhis.splice(nhiIdx, 1);
    }
  }

  // Bước 3: 2 đội nhì bảng còn lại gặp nhau (ưu tiên KHÁC bảng)
  if (remainNhis.length === 2) {
    let [p1, p2] = remainNhis;
    // Cố gắng tránh cùng bảng, nếu không được thì vẫn cho ghép
    if (p1.bracket === p2.bracket) {
      matches.push({ p1, p2, desc: `${p1.pos} ${p1.bracket} - ${p2.pos} ${p2.bracket}` });
    } else {
      matches.push({ p1, p2, desc: `${p1.pos} ${p1.bracket} - ${p2.pos} ${p2.bracket}` });
    }
    used.add(p1.name);
    used.add(p2.name);
  }

  // Trả về mảng đội theo thứ tự để genKOMatches dùng
  return matches;
}


  // 8 bảng
  if (brackets.length === 8 && numTeams === 16) {
    // Lọc nhóm nhất bảng và nhì bảng theo bảng
    let nhats = koPlayers.filter(p => p.pos === 'Nhất').sort((a,b) => a.bracket.localeCompare(b.bracket));
    let nhis = koPlayers.filter(p => p.pos === 'Nhì').sort((a,b) => a.bracket.localeCompare(b.bracket));

    // Nhánh trên: Nhất A vs Nhì B, Nhất C vs Nhì D, Nhất E vs Nhì F, Nhất G vs Nhì H
    matches.push({p1: nhats.find(p => p.bracket === 'A'), p2: nhis.find(p => p.bracket === 'B'), desc: 'Nhất A - Nhì B'});
    matches.push({p1: nhats.find(p => p.bracket === 'C'), p2: nhis.find(p => p.bracket === 'D'), desc: 'Nhất C - Nhì D'});
    matches.push({p1: nhats.find(p => p.bracket === 'E'), p2: nhis.find(p => p.bracket === 'F'), desc: 'Nhất E - Nhì F'});
    matches.push({p1: nhats.find(p => p.bracket === 'G'), p2: nhis.find(p => p.bracket === 'H'), desc: 'Nhất G - Nhì H'});

    // Nhánh dưới: Nhất B vs Nhì A, Nhất D vs Nhì C, Nhất F vs Nhì E, Nhất H vs Nhì G
    matches.push({p1: nhats.find(p => p.bracket === 'B'), p2: nhis.find(p => p.bracket === 'A'), desc: 'Nhất B - Nhì A'});
    matches.push({p1: nhats.find(p => p.bracket === 'D'), p2: nhis.find(p => p.bracket === 'C'), desc: 'Nhất D - Nhì C'});
    matches.push({p1: nhats.find(p => p.bracket === 'F'), p2: nhis.find(p => p.bracket === 'E'), desc: 'Nhất F - Nhì E'});
    matches.push({p1: nhats.find(p => p.bracket === 'H'), p2: nhis.find(p => p.bracket === 'G'), desc: 'Nhất H - Nhì G'});
  }
  else {
    // Fallback cho các trường hợp khác như cũ
    let arr = [...koPlayers];
    for (let i = 0; i < arr.length / 2; ++i) {
      matches.push({p1: arr[i], p2: arr[arr.length - 1 - i], desc: ""});
    }
  }

  return matches;
}


function shuffle(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// --- Render giao diện ---
function renderBracket(numTeams) {
  let koPlayers = getKOPlayers(numTeams);
  console.log("==> KO Matches:", koPlayers);            // kiểm tra

  let qf = genKOMatches(numTeams, koPlayers);
  console.log("Kết quả KO matches:", qf);


  // Xác định số vòng (8 đội: 3 vòng, 16 đội: 4 vòng)
  let rounds = [];
  let current = qf;
  let totalRounds = Math.log2(qf.length * 2);

  // Label cho từng vòng
  let roundLabels = ["Vòng 1/8", "Tứ kết", "Bán kết", "Chung kết"];
  if (qf.length === 4) roundLabels = ["Tứ kết", "Bán kết", "Chung kết"];
  if (qf.length === 2) roundLabels = ["Bán kết", "Chung kết"];
  if (qf.length === 1) roundLabels = ["Chung kết"];

  // Sinh toàn bộ bracket các vòng
  rounds.push(current);
  for (let r = 1; r < totalRounds; ++r) {
    let prev = rounds[r-1];
    let next = [];
    for (let i = 0; i < prev.length; i += 2) {
      let matchId1 = `R${r-1}_${i}`;
      let matchId2 = `R${r-1}_${i+1}`;
      let w1 = getWinner(prev[i].p1, prev[i].p2, matchId1) || {name: `Thắng ${roundLabels[r-1]} ${i+1}`};
      let w2 = getWinner(prev[i+1].p1, prev[i+1].p2, matchId2) || {name: `Thắng ${roundLabels[r-1]} ${i+2}`};
      next.push({p1: w1, p2: w2});
    }
    rounds.push(next);
  }

  // Render toàn bộ các vòng
  let html = '';
  for (let r = 0; r < rounds.length; ++r) {
    html += `<div class="ko-section"><div class="ko-title">${roundLabels[r]}:</div>`;
    html += rounds[r].map((m,i) => {
      let matchId = `R${r}_${i}`;
      let result = getKoResult(matchId);
      return `
  <div class="ko-match">
    <span class="ko-seed">${r === rounds.length-1 ? "CK" : r === rounds.length-2 ? "BK"+(i+1) : (i+1)}</span>
    <span class="ko-player">${
      m.p1 ? m.p1.name + (m.p1.pos ? ` <span style="color:#888; font-size:0.97em;">(${m.p1.pos} ${m.p1.bracket})</span>` : "") : "?"
    }</span>
    <input class="ko-score" type="number" min="0" max="99" value="${result.score1||''}" id="score_${matchId}_1"/>
    <span class="ko-sep">-</span>
    <input class="ko-score" type="number" min="0" max="99" value="${result.score2||''}" id="score_${matchId}_2"/>
    <span class="ko-player">${
      m.p2 ? m.p2.name + (m.p2.pos ? ` <span style="color:#888; font-size:0.97em;">(${m.p2.pos} ${m.p2.bracket})</span>` : "") : "?"
    }</span>
    <button class="ko-btn" onclick="handleSaveKoScore('${matchId}')">Lưu điểm</button>
  </div>
`;

    }).join('');
    html += `</div>`;
  }
  document.getElementById('koBracket').innerHTML = html;
}



document.addEventListener('DOMContentLoaded', renderSetupDropdown);


window.handleSaveKoScore = function(matchId) {
  let s1 = document.getElementById('score_'+matchId+'_1').value;
  let s2 = document.getElementById('score_'+matchId+'_2').value;
  saveKoResult(matchId, s1, s2);
  let num = Number(document.getElementById('koNum').value);
  renderBracket(num); // cập nhật lại giao diện ngay
};
