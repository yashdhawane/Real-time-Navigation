const socket =io();

if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const{ latitude,longitude}=position.coords;
        
        socket.emit("send-location",{latitude,longitude});
    },(error)=>{
        console.error(error);
    },{
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:1000000,
    });

    }

    const map=L.map("map").setView([0,0],20);
    console.log(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'made by yash'
            }).addTo(map);

        const markers={};

    socket.on("receive-location",(data)=>{
        console.log(data);
        const{id,latitude,longitude}=data;
        map.setView([latitude,longitude]);

        if(markers[id]){
            markers[id].setLatLng([latitude,longitude]);
        }
        else{
            markers[id]=L.marker([latitude,longitude]).addTo(map);
        }
    });


    socket.on("user-disconnected",(id)=>{
        if(markers[id]){
            map.removeLayer(markers[id]);
            delete markers[id];

        }
    })
