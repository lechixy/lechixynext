function websocketlog(message: string) {
    const styles = ['color: cyan'].join(';');
    const styles2 = ['color: white'].join(';');

    // 3. Using the styles and message variable
    let chalkmessage = `%c[lechixy\'s websocket]%c ${message}`
    console.log(chalkmessage, styles, styles2);
}

export {
    websocketlog
};