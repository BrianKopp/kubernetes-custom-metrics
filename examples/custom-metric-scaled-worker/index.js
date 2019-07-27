const delay = Number(process.env.DELAY || 5);

const runForever = () => {
    console.log('Hey, I\'m running!');
    setTimeout(runForever, delay * 1000);
};


runForever();
