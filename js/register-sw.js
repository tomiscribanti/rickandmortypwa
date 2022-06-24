if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../sw.js").then((message)=>{
        console.log('sw funcionando');
    });
} else {
    console.log('sw no funciona');
}