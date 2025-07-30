// Hàm validate inputs
function validateInputs(playersInput, courtsInput) {
    const players = parseInt(playersInput, 10);
    const courts = parseInt(courtsInput, 10);
    if (isNaN(players) || players < 1) {
        return { error: '<p class="text-red-500">Vui lòng nhập số người chơi hợp lệ.</p>' };
    }
    if (isNaN(courts) || courts < 1) {
        return { error: '<p class="text-red-500">Vui lòng nhập số sân thi đấu hợp lệ.</p>' };
    }
    if (players > 48) {
        return { error: '<p class="text-red-500">Số người chơi tối đa là 48 (8 bảng x 6 người). Vui lòng nhập lại.</p>' };
    }
    if (players < 6) {
        return { message: '<p class="text-yellow-600">Gợi ý: Bạn có thể tạo 1 bảng với ' + players + ' người chơi.</p>' };
    }
    return { players, courts, error: null, message: null };
}

// Hàm generate bracket suggestions
function generateBracketOptions(players, bracketCounts) {
    const suggestions = [];
    console.log('Generating options for players:', players, 'with bracketCounts:', bracketCounts);
    const maxBrackets = Math.min(Math.floor(players / 3), 8); // Tối đa 8 bảng
    for (let numBrackets = 1; numBrackets <= maxBrackets; numBrackets++) {
        const minPlayers = numBrackets * 3;
        const maxPlayers = numBrackets * 6;
        console.log(`Checking numBrackets: ${numBrackets}, min: ${minPlayers}, max: ${maxPlayers}`);
        if (players >= minPlayers && players <= maxPlayers) {
            let basePlayers = Math.floor(players / numBrackets);
            let extraPlayers = players % numBrackets;
            let distribution = [];
            if (basePlayers >= 3 && basePlayers <= 6) {
                for (let i = 0; i < numBrackets; i++) {
                    distribution.push(basePlayers + (i < extraPlayers ? 1 : 0));
                }
                const maxDiff = Math.max(...distribution) - Math.min(...distribution);
                console.log(`Distribution for ${numBrackets} brackets:`, distribution, 'maxDiff:', maxDiff);
                if (maxDiff <= 1) {
                    suggestions.push({
                        numBrackets: numBrackets,
                        distribution: distribution
                    });
                    console.log('Added suggestion:', { numBrackets, distribution });
                }
            }
        }
    }
    return suggestions;
}

// Hàm display results with select buttons
function displayResults(suggestions, players, courts, resultDiv) {
    let resultHtml = '<h2 class="text-lg font-semibold mt-4">Các phương án chia bảng:</h2>';
    if (suggestions.length === 0) {
        resultHtml += '<p class="text-red-500">Không tìm thấy phương án chia bảng hợp lệ cho ' + players + ' người chơi với ' + courts + ' sân. Hãy thử điều chỉnh số người chơi hoặc sân.</p>';
        console.warn('No suggestions generated for players:', players, 'courts:', courts);
    } else {
        console.log('Suggestions available:', suggestions);
        suggestions.forEach((suggestion, index) => {
            const distribution = suggestion.distribution;
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
            resultHtml += '<p class="mt-2 flex items-center"><strong>Phương án ' + (index + 1) + ' (' + suggestion.numBrackets + ' bảng):</strong> ' + distributionText + ' <button class="ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 select-bracket" data-distribution="' + distribution.join(',') + '">Chọn</button></p>';
        });
    }
    try {
        resultDiv.innerHTML = resultHtml;
        const selectButtons = document.querySelectorAll('.select-bracket');
        if (selectButtons.length > 0) {
            console.log('Select buttons added:', selectButtons.length);
            selectButtons.forEach(button => {
                button.style.display = 'inline-block'; // Đảm bảo hiển thị
                button.addEventListener('click', () => {
                    const distribution = button.dataset.distribution.split(',').map(Number);
                    const params = new URLSearchParams({
                        distribution: distribution.join(','),
                        numPlayers: players
                    });
                    console.log('Redirecting with params:', params.toString());
                    window.location.href = 'athlete.html?' + params.toString();
                });
            });
        } else {
            console.warn('No select buttons found after rendering.');
        }
    } catch (e) {
        console.error('Lỗi khi gán innerHTML:', e);
        resultDiv.innerHTML = '<p class="text-red-500">Đã xảy ra lỗi khi hiển thị kết quả. Vui lòng thử lại.</p>';
    }
}

// Hàm chính suggestBrackets
window.suggestBrackets = function() {
    const playersInput = document.getElementById('players').value;
    const courtsInput = document.getElementById('courts').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const validation = validateInputs(playersInput, courtsInput);
    if (validation.error) {
        resultDiv.innerHTML = validation.error;
        return;
    }
    if (validation.message) {
        resultDiv.innerHTML = validation.message;
        return;
    }

    const { players, courts } = validation;
    let suggestions = [];
    if (players > 32) {
        suggestions = generateBracketOptions(players, [8]);
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
    } else {
        const maxBrackets = Math.min(Math.floor(players / 3), 8);
        for (let i = 1; i <= maxBrackets; i++) {
            suggestions = suggestions.concat(generateBracketOptions(players, [i]));
        }
    }

    if (suggestions.length === 0) {
        console.warn('No valid suggestions generated for players:', players, 'courts:', courts);
    }

    if (players <= 32) {
        suggestions.sort((a, b) => Math.abs(a.numBrackets - courts) - Math.abs(b.numBrackets - courts));
    }

    displayResults(suggestions, players, courts, resultDiv);
};

// Gắn sự kiện cho nút sau khi DOM đã tải
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('generateButton');
    if (button) {
        button.addEventListener('click', window.suggestBrackets);
    } else {
        console.error('Không tìm thấy nút generateButton');
    }
});