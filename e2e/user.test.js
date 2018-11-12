import { Selector } from 'testcafe';
import { url } from './url';

const tabForAdmin = Selector('.selectTabSecond');
const tabForUsers = Selector('.selectTabFirst');
const buttLog = Selector('[type="submit"]');
const outputName = Selector('app-output-form>div>div:first-child>span:last-child');
const user = {
    login: 'Pasha',
    password: '1111'
}

fixture `Sign in by User`
.page(url)
.beforeEach(async t => {
    await t
    .typeText('[formcontrolname="login"]', user.login)
    .typeText('[formcontrolname="password"]', user.password)
    .wait(3200)
    .click('[type="submit"]')
})

test('Sign in', async t => {
    await t
    .expect(tabForAdmin.exists).notOk()
    .expect(tabForUsers.exists).ok()
});

test('Check correct login', async t => {
    await t
    .wait(3200)
    .expect(outputName.innerText).eql('Pasha')
});

test('Edit username', async t => {
    await t
    .wait(3200)
    .click('.selectTabThrid')
    .typeText('[formcontrolname="name"]', ' Stelmakh')
    .wait(3200)
    .click('form>[type="submit"]')
    .wait(200)
    .expect(outputName.innerText).eql('Pasha Stelmakh')
    user.login = 'Pasha Stelmakh';
});

test('logout', async t => {
    await t
    .click('input[value="logout"]')
    .expect(buttLog.exists).ok()
});