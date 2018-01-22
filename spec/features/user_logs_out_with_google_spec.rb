require 'rails_helper'

def stub_omniauth
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:google] = OmniAuth::AuthHash.new({
      provider: 'google',
      uid: '12345678910',
      info: {
        email: 'jesse@mountainmantechnologies.com',
        first_name: 'Jesse',
        last_name: 'Spevack'
      },
      credentials: {
        token: 'abcdefg12345',
        refresh_token: '12345abcdefg'
      }
    })
end

RSpec.feature 'user logs out' do
  scenario 'using google oauth2' do
    stub_omniauth
    visit root_path
    expect(page).to have_link('Sign In')
    click_link 'Sign In'
    expect(page).to have_link('Sign Out')
    click_link 'Sign Out'
    expect(page).to have_link('Sign In')
  end
end
