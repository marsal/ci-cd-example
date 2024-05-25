import assert from 'node:assert';
import {Given, When, Then} from '@cucumber/cucumber';

function isItFriday(today: string) {
    if (today === 'Friday') {
        return 'TGIF';
    } else {
        return 'Nope';
    }
}
Given('today is Friday', function () {
    this.today = 'Friday';
});

Given('today is Sunday', function (this) {
    this.today = 'Sunday';
});

When("I ask whether it's Friday yet", function (this) {
    this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (this, expectedAnswer) {
    assert.strictEqual(this.actualAnswer, expectedAnswer);
});
