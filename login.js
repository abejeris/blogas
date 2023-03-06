const modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
const meilas = document.querySelector("#meilas");
const submitas = document.querySelector("#submitas");
const vardas = document.querySelector("#vardas");
const forma = document.querySelector("#forma");
const username = document.querySelector("#uname");
const useremail = document.querySelector("#email");

submitas.addEventListener("click", (e) => {
	e.preventDefault();
	fetch("https://testapi.io/api/audriusb/resource/login")
		.then((response) => response.json())
		.then((data) => {
			const dataArray = data.data;
			const account = dataArray.find((element) => {
				const usrname = element.name;
				const usermeil = element.email;
				return usrname === vardas.value && usermeil === meilas.value;
			});
			if (account) {
				console.log("match found");
				document.body.style.backgroundColor = "green";
				document.querySelector("h2").textContent = "You are now logged in";
			} else {
				console.log("not so fast");
				document.body.style.backgroundColor = "red";
				document.querySelector("h2").textContent = "Wrong credentials";
			}
		})
		.catch((err) => console.log(err));
});

modal.addEventListener("submit", (e) => {
	e.preventDefault();
	fetch("https://testapi.io/api/audriusb/resource/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: username.value,
			email: useremail.value,
		}),
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
	username.value = "";
	useremail.value = "";
});
