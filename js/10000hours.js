/* 훈련 시간 계산 */
const checkButton = document.querySelector('.intro-sec .btn-check');
const [fieldInput, hourInput] = document.querySelectorAll('.intro-input input');
const trainingSection = document.querySelector('.training-sec');
const [fieldResult, dayResult] = trainingSection.querySelectorAll('strong[class^=result]');
const loadingSection = document.querySelector('.loading-sec');
let timer;

checkButton.addEventListener('click', function () {
    if (!checkInputValue()) return;
    setResult();
    openResult();
});

function checkInputValue() {
    if (fieldInput.value == '') {
        alert('전문가가 되고 싶은 분야를 입력하세요.');
        return false;
    }
    if (hourInput.value == '') {
        alert('훈련 시간을 입력하세요.');
        return false;
    }
    if (hourInput.value <= 0 || hourInput.value > 24) {
        alert('훈련 시간은 0초과 24이하 값으로 작성해 주세요.');
        return false;
    }

    return true;
}

function setResult() {
    fieldResult.innerHTML = fieldInput.value;
    dayResult.innerHTML = parseInt(10000 / hourInput.value);
}

function openResult() {
    clearTimeout(timer);
    trainingSection.classList.remove('is-active');
    loadingSection.classList.add('is-active');
    timer = setTimeout(function () {
        loadingSection.classList.remove('is-active');
        trainingSection.classList.add('is-active');
    }, 1500);
}

/* 모달 */
const openButton = document.querySelector('.training-sec .btn-open');
const closeButton = document.querySelector('.modal-cont .btn-close');
const dimmed = document.querySelector('.dimmed');
let isModalOpened = false;
let currentModalTarget;
let currentModalButton;
let focusable;

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
dimmed.addEventListener('click', closeModal);
document.addEventListener('keydown', e => checkKeyPressed(e));

function openModal() {
    isModalOpened = true;
    currentModalButton = this;
    currentModalTarget = document.querySelector(`#${this.dataset.target}`);
    currentModalTarget.classList.add('is-active');
    dimmed.classList.add('is-active');

    /* focus 가능한 요소가 있을 시 해당 요소에 focus 트리거 */
    focusable = currentModalTarget.querySelectorAll('a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])');
    if (focusable) {
        focusable[0].focus();
    }
}

function closeModal() {
    isModalOpened = false;
    currentModalTarget.classList.remove('is-active');
    dimmed.classList.remove('is-active');

    currentModalButton.focus();
}

function checkKeyPressed(e) {
    if (!isModalOpened) return;

    /* ESC */
    if (e.keyCode == 27) {
        closeModal();
    }

    /* Tab */
    if (e.keyCode == 9) {
        if (!e.shiftKey && document.activeElement == [...focusable].at(-1)) {
            e.preventDefault();
            focusable[0].focus();
        } else if (e.shiftKey && document.activeElement == focusable[0]) {
            /* Tab + Shift */
            e.preventDefault();
            [...focusable].at(-1).focus();
        }
    }
}

/* 공유하기 버튼 */
const shareButton = document.querySelector('.btn-share');

shareButton.addEventListener('click', copyUrl);

function copyUrl() {
    let url = document.location.href;
    const textarea = document.createElement('textarea');

    document.body.appendChild(textarea);
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    alert('URL 복사가 완료되었습니다');
}