let data = {};

// JSON 데이터 로드
fetch('/Required-Document-Guidance/data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        initializeNationality();
    })
    .catch(error => {
        console.error('데이터 로드 실패:', error);
        alert('데이터를 불러오는데 실패했습니다.');
    });

// 고객 국적 초기화
function initializeNationality() {
    const nationalitySelect = document.getElementById('nationality');
    const nationalities = Object.keys(data);
    
    nationalities.forEach(nationality => {
        const option = document.createElement('option');
        option.value = nationality;
        option.textContent = nationality;
        nationalitySelect.appendChild(option);
    });
}

// 고객 국적 선택 이벤트
document.getElementById('nationality').addEventListener('change', function() {
    const nationality = this.value;
    const businessTypeSelect = document.getElementById('businessType');
    const detailType1Select = document.getElementById('detailType1');
    const detailType2Select = document.getElementById('detailType2');
    
    // 하위 선택 초기화
    resetSelect(businessTypeSelect);
    resetSelect(detailType1Select);
    resetSelect(detailType2Select);
    hideResult();
    
    if (nationality) {
        const businessTypes = Object.keys(data[nationality]);
        populateSelect(businessTypeSelect, businessTypes);
        businessTypeSelect.disabled = false;
    } else {
        businessTypeSelect.disabled = true;
    }
});

// 업무처리 유형 선택 이벤트
document.getElementById('businessType').addEventListener('change', function() {
    const nationality = document.getElementById('nationality').value;
    const businessType = this.value;
    const detailType1Select = document.getElementById('detailType1');
    const detailType2Select = document.getElementById('detailType2');
    
    // 하위 선택 초기화
    resetSelect(detailType1Select);
    resetSelect(detailType2Select);
    hideResult();
    
    if (businessType) {
        const detailTypes1 = Object.keys(data[nationality][businessType]);
        populateSelect(detailType1Select, detailTypes1);
        detailType1Select.disabled = false;
    } else {
        detailType1Select.disabled = true;
    }
});

// 상세유형 1 선택 이벤트
document.getElementById('detailType1').addEventListener('change', function() {
    const nationality = document.getElementById('nationality').value;
    const businessType = document.getElementById('businessType').value;
    const detailType1 = this.value;
    const detailType2Select = document.getElementById('detailType2');
    
    // 하위 선택 초기화
    resetSelect(detailType2Select);
    hideResult();
    
    if (detailType1) {
        const detailTypes2 = Object.keys(data[nationality][businessType][detailType1]);
        populateSelect(detailType2Select, detailTypes2);
        detailType2Select.disabled = false;
    } else {
        detailType2Select.disabled = true;
    }
});

// 상세유형 2 선택 이벤트
document.getElementById('detailType2').addEventListener('change', function() {
    const nationality = document.getElementById('nationality').value;
    const businessType = document.getElementById('businessType').value;
    const detailType1 = document.getElementById('detailType1').value;
    const detailType2 = this.value;
    
    if (detailType2) {
        const result = data[nationality][businessType][detailType1][detailType2];
        displayResult(result);
    } else {
        hideResult();
    }
});

// 선택 박스 초기화
function resetSelect(selectElement) {
    selectElement.innerHTML = '<option value="">선택하세요</option>';
    selectElement.disabled = true;
}

// 선택 박스 채우기
function populateSelect(selectElement, options) {
    selectElement.innerHTML = '<option value="">선택하세요</option>';
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectElement.appendChild(optionElement);
    });
}

// 결과 표시
function displayResult(result) {
    document.getElementById('requiredDocs').textContent = result['필수 서류'];
    document.getElementById('situationalInfo').textContent = result['상황별 안내사항'];
    document.getElementById('commonInfo').textContent = result['공통 전달사항'];
    document.getElementById('resultPanel').style.display = 'block';
    
    // 결과 패널로 스크롤
    document.getElementById('resultPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 결과 숨기기
function hideResult() {
    document.getElementById('resultPanel').style.display = 'none';
}

// 초기화 버튼
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('nationality').value = '';
    resetSelect(document.getElementById('businessType'));
    resetSelect(document.getElementById('detailType1'));
    resetSelect(document.getElementById('detailType2'));
    hideResult();
});

// 인쇄 버튼
document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});
