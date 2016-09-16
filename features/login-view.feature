Feature: Login view feature

  @watch
  Scenario: I want to see my feed when logged in
    Given I am successfully logged in as "user"
    And I am viewing the page at "/"
    Then I can see the list item "Katnis Everdeen"
    And
