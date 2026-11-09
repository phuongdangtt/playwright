// @ts-check

//Global data
export const globalData = {
  baseUrl: 'https://demoqa.com',
  username: 'phuongtest3',
  password: 'Test@123',
}

//Login page data
export const loginData = {
  loginURL: globalData.baseUrl + '/login',
  invalidUsername: 'invalid_' + globalData.username,
  invalidPassword: 'invalid_' + globalData.password,
  loginErrorMessage: 'Invalid username or password!'
};

// Bookstore page data
export const bookstoreData = {
  bookstoreURL: globalData.baseUrl + '/books',
  searchKeywords: ['Design', 'design'],
  expectedBooks: [
    'Learning JavaScript Design Patterns',
    'Designing Evolvable Web APIs with ASP.NET'
  ]
};

//Profile page data
export const profileData = {
  bookName: 'Learning JavaScript Design Patterns',
  profileURL: globalData.baseUrl + '/profile'
};
