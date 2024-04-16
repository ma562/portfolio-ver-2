
const my_background = localStorage.getItem('my__background');
const is_theme = localStorage.getItem('is__theme')

let id = document.getElementById("home")

if((my_background == null) || (is_theme == null)) {
	//we did not previously select a background --> randomly generate one
	let currentTime = new Date();
	let currentHour = currentTime.getHours();

	if (currentHour >= 18 || currentHour < 6) {
		//It's night time
  		if (screen.width >= 1300) {
  			bkground = "url('backgrounds/Base_Background_Night.png')"
  			id.style.backgroundImage = bkground
  		}
  		else {
  			bkground = "url('mobile_backgrounds/mobile_night.png')"
  			id.style.backgroundImage = bkground
  		}
	} else {
		//It's day time
  		if (screen.width >= 1300) {
  			bkground = "url('backgrounds/Base_Background_Day.png')"
  			id.style.backgroundImage = bkground
  		}
  		else {
  			bkground = "url('mobile_backgrounds/mobile_day.png')"
  			id.style.backgroundImage = bkground
  		}
	}

}
else {
	//memories background selector
	if(is_theme == 1) {
		pick = my_background
		pick *= 4;
		pick -= Math.floor(Math.random() * 4);
		if (screen.width >= 1300) {
			console.log(pick)
			bkground = "url('backgrounds/background_" + String(pick) + ".png')"
		}
		else {
			bkground = "url('mobile_backgrounds/mobile_background_" + String(pick) + ".png')"
		}
		id.style.backgroundImage = bkground
	}
	else {
		if(screen.width >= 1300) {
			bkground = "url('memories/" + my_background + ".png')"
		}
		else {
			bkground = "url('mobile_memories/mobile_" + my_background + ".png')"
		}
		id.style.backgroundImage = bkground
	}
}

//remove the localStorage so if page is refreshed we go back to homepage
localStorage.removeItem('my__background');
localStorage.removeItem('is__theme');

id.style.backgroundSize = "cover";
id.style.backgroundRepeat = "no-repeat"
