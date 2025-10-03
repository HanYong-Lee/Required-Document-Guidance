// 전역 변수
let data = {};

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    initializeSelects();
    setupEventListeners();
});

// JSON 데이터 로드
async function loadData() {
    try {
        const response = await fetch('data.json');
        data = await response.json();
        console.log('데이터 로드 완료:', data);
    } catch (error) {
        console.error('데이터 로드 실패:', error);
        alert('데이터를 불러오는데 실패했습니다. data.json 파일을 확인해주세요.');
    }
}

// 초기 드롭다운 설정
function initializeSelects() {
    const 업무처리유형Select = document.getElementById('업무처리유형');
    
    // 업무처리 유형 옵션 추가
    Object.keys(data).forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        업무처리유형Select.appendChild(option);
    });
}

// 이벤트 리스너 설정
function setupEventListeners() {
    const 업무처리유형Select = document.getElementById('업무처리유형');
    const 상세유형1Select = document.getElementById('상세유형1');
    const 상세유형2Select = document.getElementById('상세유형2');

    업무처리유형Select.addEventListener('change', (e) => {
        handle업무처리유형Change(e.target.value);
    });

    상세유형1Select.addEventListener('change', (e) => {
        handle상세유형1Change(e.target.value);
    });

    상세유형2Select.addEventListener('change', (e) => {
        handle상세유형2Change(e.target.value);
    });
}

// 업무처리 유형 변경 처리
function handle업무처리유형Change(selectedValue) {
    const 상세유형1Select = document.getElementById('상세유형1');
    const 상세유형2Select = document.getElementById('상세유형2');
    
    // 하위 드롭다운 초기화
    상세유형1Select.innerHTML = '<option value="">선택하세요</option>';
    상세유형2Select.innerHTML = '<option value="">먼저 상세유형 1을 선택하세요</option>';
    상세유형2Select.disabled = true;
    hideResults();

    if (selectedValue && data[selectedValue]) {
        상세유형1Select.disabled = false;
        
        // 상세유형1 옵션 추가
        Object.keys(data[selectedValue]).sort().forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            상세유형1Select.appendChild(option);
        });
    } else {
        상세유형1Select.disabled = true;
    }
}

// 상세유형1 변경 처리
function handle상세유형1Change(selectedValue) {
    const 업무처리유형 = document.getElementById('업무처리유형').value;
    const 상세유형2Select = document.getElementById('상세유형2');
    
    // 상세유형2 초기화
    상세유형2Select.innerHTML = '<option value="">선택하세요</option>';
    hideResults();

    if (selectedValue && data[업무처리유형] && data[업무처리유형][selectedValue]) {
        상세유형2Select.disabled = false;
        
        // 상세유형2 옵션 추가
        Object.keys(data[업무처리유형][selectedValue]).sort().forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            상세유형2Select.appendChild(option);
        });
    } else {
        상세유형2Select.disabled = true;
    }
}

// 상세유형2 변경 처리 및 결과 표시
function handle상세유형2Change(selectedValue) {
    const 업무처리유형 = document.getElementById('업무처리유형').value;
    const 상세유형1 = document.getElementById('상세유형1').value;

    if (selectedValue && data[업무처리유형] && data[업무처리유형][상세유형1] && data[업무처리유형][상세유형1][selectedValue]) {
        const resultData = data[업무처리유형][상세유형1][selectedValue];
        displayResults(resultData);
    } else {
        hideResults();
    }
}

// 결과 표시
function displayResults(resultData) {
    const resultPanel = document.getElementById('result-panel');
    const noResult = document.getElementById('no-result');
    
    if (resultData && resultData.length > 0) {
        // 첫 번째 항목의 데이터 사용 (중복 제거된 데이터)
        const item = resultData[0];
        
        document.getElementById('필수서류').innerHTML = formatText(item['필수 서류']);
        document.getElementById('상황별안내사항').innerHTML = formatText(item['상황별 안내사항']);
        document.getElementById('공통전달사항').innerHTML = formatText(item['공통 전달사항']);
        
        resultPanel.style.display = 'block';
        noResult.style.display = 'none';
        
        // 결과 패널로 스크롤
        resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        resultPanel.style.display = 'none';
        noResult.style.display = 'block';
    }
}

// 결과 숨기기
function hideResults() {
    document.getElementById('result-panel').style.display = 'none';
    document.getElementById('no-result').style.display = 'none';
}

// 텍스트 포맷팅 (줄바꿈 처리)
function formatText(text) {
    if (!text) return '<p style="color: #999;">정보 없음</p>';
    
    // 줄바꿈을 <br>로 변환하고, 번호가 있는 항목은 강조
    return text
        .split('\n')
        .map(line => {
            line = line.trim();
            if (!line) return '';
            
            // 번호로 시작하는 줄 강조
            if (/^\d+\./.test(line) || /^\d+\)/.test(line)) {
                return `<p style="font-weight: 600; color: #333; margin-top: 10px;">${line}</p>`;
            }
            // 들여쓰기가 있는 줄
            else if (line.startsWith('  ')) {
                return `<p style="margin-left: 20px; color: #666;">${line}</p>`;
            }
            // 일반 줄
            else {
                return `<p>${line}</p>`;
            }
        })
        .join('');
}
