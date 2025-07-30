window.suggestBrackets = function() {
    const playersInput = document.getElementById('players').value;
    const courtsInput = document.getElementById('courts').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    // Input validation
    const players = parseInt(playersInput, 10);
    const courts = parseInt(courtsInput, 10);
    if (isNaN(players) || players < 1) {
        resultDiv.innerHTML = '<p class="text-red-500">Vui lòng nhập số người chơi hợp lệ.</p>';
        return;
    }
    if (isNaN(courts) || courts < 1) {
        resultDiv.innerHTML = '<p class="text-red-500">Vui lòng nhập số sân thi đấu hợp lệ.</p>';
        return;
    }
    // Case: x > 48
    if (players > 48) {
        resultDiv.innerHTML = '<p class="text-red-500">Số người chơi tối đa là 48 (8 bảng x 6 người). Vui lòng nhập lại.</p>';
        return;
    }
    // Case: x < 6
    if (players < 6) {
        resultDiv.innerHTML = '<p class="text-yellow-600">Bạn có thể tạo 1 bảng với ' + players + ' người chơi.</p>';
        return;
    }
    // Generate bracket suggestions
    let suggestions = [];
    if (players > 32) {
        suggestions = generateBracketOptions(players, [8]); // Chỉ đưa ra phương án 8 bảng
    } else if (players >= 6 && players <= 11) {
        suggestions = generateBracketOptions(players, [2, 3]);
    } else if (players > 11 && players < 23) {
        if (courts <= 4) {
            suggestions = generateBracketOptions(players, [4]);
        } else {
            suggestions = generateBracketOptions(players, [4, 5, 6]);
        }
    } else if (players >= 23 && players <= 32) {
        suggestions = generateBracketOptions(players, [4, 5, 6, 7, 8]);
    }
    // Sort suggestions by closeness to number of courts (trừ trường hợp x > 32)
    if (players <= 32) {
        suggestions.sort((a, b) => Math.abs(a.numBrackets - courts) - Math.abs(b.numBrackets - courts));
    }
    // Display results
    let resultHtml = '<h2 class="text-lg font-semibold mt-4">Các phương án chia bảng:</h2>';
    if (suggestions.length === 0) {
        resultHtml += '<p class="text-red-500">Không tìm thấy phương án chia bảng hợp lệ cho ' + players + ' người chơi.</p>';
    } else {
        suggestions.forEach((suggestion, index) => {
            const distribution = suggestion.distribution;
            // Kiểm tra xem tất cả bảng có cùng số người không
            const allSame = distribution.every(val => val === distribution[0]);
            let distributionText;
            if (allSame) {
                distributionText = 'mỗi bảng ' + distribution[0] + ' người';
            } else {
                const counts = {};
                distribution.forEach(num => {
                    counts[num] = (counts[num] || 0) + 1;
                });
                distributionText = Object.entries(counts)
                    .map(([num, count]) => count + ' bảng ' + num + ' người')
                    .join(', ');
            }
            resultHtml += '<p class="mt-2"><strong>Phương án ' + (index + 1) + ' (' + suggestion.numBrackets + ' bảng):</strong> ' + distributionText + '</p>';
        });
    }
    try {
        resultDiv.innerHTML = resultHtml;
    } catch (e) {
        console.error('Lỗi khi gán innerHTML:', e);
        resultDiv.innerHTML = '<p class="text-red-500">Đã xảy ra lỗi khi hiển thị kết quả. Vui lòng thử lại.</p>';
    }
};
function generateBracketOptions(players, bracketCounts) {
    const suggestions = [];
    for (let numBrackets of bracketCounts) {
        const minPlayers = numBrackets * 3;
        const maxPlayers = numBrackets * 6;
        if (players < minPlayers || players > maxPlayers) {
            continue;
        }
        let basePlayers = Math.floor(players / numBrackets);
        let extraPlayers = players % numBrackets;
        let distribution = [];
        if (basePlayers >= 3 && basePlayers <= 6) {
            for (let i = 0; i < numBrackets; i++) {
                distribution.push(basePlayers + (i < extraPlayers ? 1 : 0));
            }
            const maxDiff = Math.max(...distribution) - Math.min(...distribution);
            if (maxDiff <= 1) {
                suggestions.push({
                    numBrackets: numBrackets,
                    distribution: distribution
                });
            }
        }
    }
    return suggestions;
}
// Gắn sự kiện cho nút sau khi DOM đã tải
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generateButton');
    if (button) {
        button.addEventListener('click', window.suggestBrackets);
    } else {
        console.error('Không tìm thấy nút generateButton');
    }
});