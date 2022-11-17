export var httpRequest = jest.fn();
export var httpGet = jest.fn();
export var httpPost = jest.fn();
export var httpPatch = jest.fn();
export var httpPut = jest.fn();
export var httpDelete = jest.fn();
var HttpMockImpl = /** @class */ (function () {
    function HttpMockImpl() {
        this.request = httpRequest;
        this.get = httpGet;
        this.post = httpPost;
        this.patch = httpPatch;
        this.put = httpPut;
        this.delete = httpDelete;
    }
    HttpMockImpl.prototype.clear = function () {
        httpRequest.mockClear();
        httpGet.mockClear();
        httpPost.mockClear();
        httpPatch.mockClear();
        httpPut.mockClear();
        httpDelete.mockClear();
    };
    return HttpMockImpl;
}());
export { HttpMockImpl };
