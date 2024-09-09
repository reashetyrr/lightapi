class GoveeAPIResponse {
  constructor(response) {
    this.response = response;
  }

    get status() {
        return this.response.status;
    }

    get data() {
        return this.response.data;
    }

    get headers() {
        return this.response.headers;
    }

    get ok() {
        return this.response.ok;
    }

    async get json() {
        return this.response.json();
    }



}