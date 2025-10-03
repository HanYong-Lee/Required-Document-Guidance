# 휴대폰 개통 업무유형별 구비서류 안내 웹사이트 GitHub 배포 가이드

이 문서는 생성된 웹사이트 파일(`index.html`, `styles.css`, `app.js`, `data.json`)을 GitHub Pages를 이용하여 배포하는 방법을 안내합니다. GitHub Pages는 GitHub 저장소에서 직접 정적 웹사이트를 호스팅할 수 있도록 해주는 서비스로, 비개발자도 쉽게 웹사이트를 공개할 수 있습니다.

## 1. GitHub 계정 생성 및 저장소(Repository) 만들기

1.  **GitHub 계정 생성**: 아직 GitHub 계정이 없다면, [GitHub 웹사이트](https://github.com/)에 접속하여 회원가입을 진행합니다.
2.  **새 저장소 생성**: 로그인 후, GitHub 메인 페이지 오른쪽 상단의 `+` 버튼을 클릭하고 `New repository`를 선택합니다.
    *   **Repository name**: `phone-document-guide`와 같이 웹사이트의 목적을 나타내는 이름을 입력합니다. (예: `your-username.github.io` 형식으로 저장소 이름을 만들면 개인/조직 페이지로 바로 배포됩니다. 이 경우 `your-username`은 본인의 GitHub 사용자 이름이어야 합니다.)
    *   **Description (Optional)**: 저장소에 대한 설명을 추가합니다.
    *   **Public/Private**: `Public`을 선택하여 누구나 웹사이트에 접근할 수 있도록 합니다.
    *   `Add a README file`, `Add .gitignore`, `Choose a license`는 선택 사항입니다. 여기서는 체크하지 않아도 무방합니다.
    *   `Create repository` 버튼을 클릭하여 저장소를 생성합니다.

## 2. 웹사이트 파일 업로드

생성된 저장소 페이지에서 웹사이트 파일을 업로드합니다.

1.  **파일 업로드 페이지로 이동**: 저장소 페이지에서 `Add file` 버튼을 클릭하고 `Upload files`를 선택합니다.
2.  **파일 드래그 앤 드롭**: `index.html`, `styles.css`, `app.js`, `data.json` 파일을 드래그하여 페이지에 놓거나, `choose your files`를 클릭하여 파일을 선택합니다.
3.  **변경 사항 커밋**: 하단의 `Commit changes` 섹션에서 커밋 메시지(예: 

첫 번째 웹사이트 파일 업로드`)를 입력하고 `Commit changes` 버튼을 클릭합니다.

## 3. GitHub Pages 설정

업로드된 파일을 웹사이트로 배포하기 위해 GitHub Pages를 설정합니다.

1.  **Settings 탭 이동**: 저장소 페이지 상단의 `Settings` 탭을 클릭합니다.
2.  **Pages 메뉴 선택**: 왼쪽 사이드바에서 `Pages`를 선택합니다.
3.  **Source 설정**: `Branch` 섹션에서 `main` (또는 `master`) 브랜치를 선택하고, `/ (root)` 폴더를 선택한 후 `Save` 버튼을 클릭합니다.
    *   만약 `main` 브랜치가 보이지 않는다면, 파일 업로드 시 `main` 브랜치로 업로드되었는지 확인해야 합니다.
4.  **배포 확인**: 설정이 완료되면, 페이지 상단에 `Your site is published at https://your-username.github.io/your-repository-name/` 와 같은 메시지가 나타납니다. `your-username`은 본인의 GitHub 사용자 이름이며, `your-repository-name`은 저장소 이름입니다. 이 URL을 클릭하여 배포된 웹사이트를 확인할 수 있습니다.
    *   웹사이트가 바로 보이지 않을 수 있습니다. 배포에는 몇 분 정도 소요될 수 있으니 잠시 기다린 후 새로고침 해보세요.

## 4. 웹사이트 업데이트

웹사이트 내용을 변경하고 싶다면, 수정된 파일들을 동일한 저장소에 다시 업로드(덮어쓰기)하면 됩니다. GitHub Pages는 자동으로 변경 사항을 감지하여 웹사이트를 업데이트합니다.

1.  수정된 파일을 로컬에서 준비합니다.
2.  GitHub 저장소 페이지로 이동합니다.
3.  `Add file` -> `Upload files`를 선택합니다.
4.  수정된 파일을 드래그 앤 드롭하여 업로드합니다. 기존 파일과 이름이 같으면 덮어쓰기가 됩니다.
5.  커밋 메시지를 입력하고 `Commit changes`를 클릭합니다.

이제 매장 직원들이 휴대폰 개통 업무에 필요한 구비서류를 쉽게 확인할 수 있는 웹사이트가 성공적으로 배포되었습니다!
