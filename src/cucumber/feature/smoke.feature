Feature: Smoke Test

  Scenario: Verify TTACart login page loads
    Given I open the TTACart login page
    Then the page title should contain "TTACart"
