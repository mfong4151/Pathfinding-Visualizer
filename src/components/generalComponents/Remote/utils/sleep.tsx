const sleep = (ms:number = 1000) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < ms);
  };

export default sleep;