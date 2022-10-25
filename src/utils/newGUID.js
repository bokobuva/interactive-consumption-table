
const newGUID = (prefix = 'id') => {
    let lastId = localStorage.getItem('lastId') || 0;
    lastId++
    localStorage.setItem('lastId', lastId);
    return `${prefix}-${lastId}`;
}

export default newGUID;
