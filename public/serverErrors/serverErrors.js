module.exports = class Error{
    constructor(obj){
        this.uid = obj.uid;
        this.category = obj.category;
        this.msg = obj.msg
    }
}