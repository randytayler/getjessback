function draw(pic,width,height,reverse){
	var c=document.getElementById('canvas');
	var x=c.getContext('2d');
	x.fillStyle = "white";
	x.fillRect(0, 0, width, height);
	drawLines(pic,width,0,0,reverse);
}
function drawLines(pic,width,posX,posY,reverse){
	var c=document.getElementById('canvas');
	var x=c.getContext('2d');
	var img=new Image();
	for (var i=0; i<pic.length; i++){
		x.beginPath();
		x.fillStyle = pic[i].color;
		x.moveTo(pic[i].points[0]+posX,pic[i].points[1]+posY);
		for(y=2;y<pic[i].points.length;y+=2){
			x.lineTo(pic[i].points[y]+posX,pic[i].points[y+1]+posY);
		}
		x.fill();
		x.closePath();
	}
	if(reverse != null){
		img.src=c.toDataURL();
		x.translate(width,0);
		x.scale(-1,1);
		x.drawImage(img,0,0);
	}
}
function overlay(pic1,pic2,posX,posY,width,height){
	draw(pic1,width,height);
	drawLines(pic2,width,posX,posY);
}