import { Selector } from 'testcafe';
import { url } from './url';

const tabForAdmin = Selector('.selectTabSecond');
const buttLog = Selector('[type="submit"]');
const outputName = Selector('app-output-form>div>div:nth-child(2)>span:last-child');
const userDropdownItem = Selector('app-user-dropdown-item');
const chosenUserAge = Selector('.chosen>div:first-child>div:nth-child(2)>span:last-child');

fixture `Sign in by Admin`
.page(url)
.beforeEach(async t => {
    await t
    .typeText('[formcontrolname="login"]', 'Admin')
    .typeText('[formcontrolname="password"]', 'Admin')
    .wait(3200)
    .click('[type="submit"]')
})

test('Sign in', async t => {
    await t
        .expect(tabForAdmin.exists).ok()
});

test('Check correct login', async t => {
    await t
    .wait(3200)
    .expect(outputName.innerText).eql('19')
});

test('Edit the admin age', async t => {
    await t
    .wait(3200)
    .click('.selectTabThrid')
    .typeText('[formcontrolname="age"]', '40', {replace: true})
    .wait(3000)
    .click('form>[type="submit"]')
    .wait(200)
    .expect(outputName.innerText).eql('40')
});

test('Edit user', async t => {
    await t
    .click('.selectTabSecond')
    .click('.chosen>div:last-child')
    .click('input[type="text"]')
    .wait(3200)
    .expect(userDropdownItem.count).eql(3)
    .click('app-user-dropdown-item:last-child')
    .click('.buttons>button:nth-child(2)')
    .wait(200)
    .typeText('[formcontrolname="age"]', '40', {replace: true})
    .wait(3000)
    .click('form>[type="submit"]')
    .wait(200)
    .expect(chosenUserAge.innerText).eql('40')
});

test('Delete user', async t => {
    await t
    .click('.selectTabSecond')
    .click('.chosen>div:last-child')
    .click('input[type="text"]')
    .wait(3200)
    .expect(userDropdownItem.count).eql(3)
    .click('app-user-dropdown-item:last-child')
    .click('.buttons>button:nth-child(1)')
    .click('input[type="text"]')
    .wait(3200)
    .expect(userDropdownItem.count).eql(2)
});

test('logout', async t => {
    await t
    .click('input[value="logout"]')
    .expect(buttLog.exists).ok()
});