export function logoutBtn() {

    const button = document.querySelector("#logoutBtn");

    if(button) {
        button.onclick = function() {
            const logOutUser = confirm("Do you want to log out?");

            if(logOutUser) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                location.href = "/";
            }
        }
    }
}

export function logoutBtnSm() {

    const button = document.querySelector("#logoutBtnSm");

    if(button) {
        button.onclick = function() {
            const logOutUser = confirm("Do you want to log out?");

            if(logOutUser) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                location.href = "/";
            }
        }
    }
}