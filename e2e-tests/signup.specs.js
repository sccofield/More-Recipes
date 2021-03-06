const signUpUser = (browser, user = {}) => browser
  .waitForElementVisible('body', 5000)
  .assert.title('Get Your Recipe')
  .assert.containsText('#signIn', 'Sign In')
  .assert.containsText('#signUp', 'Sign Up')
  .assert.containsText('.overlay__h3', 'Welcome To Recipes. All About Reciping')
  .assert.containsText('.title__link', 'Recipes')
  .assert.containsText('#brand', 'Recipes')
  .assert.containsText('.categories', 'Categories')
  .assert.containsText('#recipesNav', 'Recipes')
  .click('#signUp')
  .setValue('#firstName', user.firstName)
  .setValue('#lastName', user.lastName)
  .setValue('#email', user.email)
  .setValue('#newPassword', user.password)
  .setValue('#confirmPassword', user.password)
  .assert.containsText('#signUpSubmit', 'Signup')
      .execute(function () { //eslint-disable-line
    document.querySelector('#signUpSubmit').click();
  })
  .pause(1000)
  .url('http://localhost:7000')
  .waitForElementVisible('body', 5000)
  .assert.title('Get Your Recipe')
  .assert.containsText('#user-drop-down', 'Seun')
  .click('#user-drop-down')
  // .assert.containsText('#signUp', 'Sign Up')
  .assert.containsText('.overlay__h3', 'Welcome To Recipes. All About Reciping')
  .assert.containsText('.title__link', 'Recipes')
  .assert.containsText('#brand', 'Recipes')
  .assert.containsText('.categories', 'Categories')
  .url('http://localhost:7000')
export default signUpUser;
