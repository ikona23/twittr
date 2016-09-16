Feature: Authentication feature

  @watch
  Scenario: I want to register as a Twittr user so I can log in securely
    Given I am viewing the page at "/login"
    When I click on the link "/register"
    And I can see an input named "email"
    When I enter "new_user111" into the "username" input
    And I enter "user111@user111.com" into the "email" input
    And I enter "password111" into the "password" input
    When I click on the input with value "Register"
    Then I enter "new_user111" into the "username" input
    And I enter "password111" into the "password" input
    When I click on the input with value "Log in"
    Then I can see the p item with value "Welcome to new_user111's feed, email: user111@user111.com"
