export default class Service {
    async getUserDetails(userId) {
        console.log("USERID", userId)
        return new Promise((resolve, reject) => {
            var whereClause = { "userId": userId }
            var apiUrl = "http://localhost:1337/users?where=" + JSON.stringify(whereClause);
            fetch(apiUrl, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                response.json().then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        })
    }

    async getUsers() {
        return new Promise((resolve, reject) => {
            var apiUrl = "http://localhost:1337/users";
            fetch(apiUrl, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                response.json().then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            })
        })
    }

    async postUserDetails(userPayload) {
        var apiUrl = "http://localhost:1337/users";
        fetch(apiUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(userPayload), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json().then(data => {
                console.log("SUCCESS", data)
            }).catch(error => {
                console.log(error)
            })
        }).catch(error => {
            console.log(error);
        })

    }

    getBooks(state) {
        return new Promise((resolve, reject) => {
            var apiUrl = "";
            if (state === "user") {
                var whereClause = { "userId": localStorage.getItem("userId") }
                apiUrl = "http://localhost:1337/myshelf?where=" + JSON.stringify(whereClause);
                console.log(apiUrl);
                fetch(apiUrl, {
                    method: 'GET', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    response.json().then(data => {
                        resolve(data);
                    }).catch(error => {
                        reject(error);
                    })
                }).catch(error => {
                    reject(error);
                })
            } else if (state === "catalogue") {
                //var whereClause = { "userId": localStorage.getItem("userId") }
                apiUrl = "http://localhost:1337/book";
                fetch(apiUrl, {
                    method: 'GET', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    response.json().then(data => {
                        resolve(data);
                    }).catch(error => {
                        reject(error);
                    })
                }).catch(error => {
                    reject(error);
                })
            }
        })
    }

    AddUserBooks(book) {
        return new Promise((resolve, reject) => {
            var apiUrl = "http://localhost:1337/myshelf";
            var userbook = {
                userId: localStorage.getItem("userId"),
                bookId: book.bookId,
                name: book.name,
                image: book.image,
                author: book.author
            }
            fetch(apiUrl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(userbook), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                response.json().then(data => {
                    resolve(data)
                }).catch(error => {
                    reject(error)
                })
            }).catch(error => {
                reject(error);
            })
        })
    }

    getGuestBooks(userId) {
        return new Promise((resolve, reject) => {
            var apiUrl = "";
            var whereClause = { "userId": userId }
            apiUrl = "http://localhost:1337/myshelf?where=" + JSON.stringify(whereClause);
            console.log(apiUrl);
            fetch(apiUrl, {
                method: 'GET', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                response.json().then(data => {
                    resolve(data);
                }).catch(error => {
                    reject(error);
                })
            }).catch(error => {
                reject(error);
            })
        })
    }
}