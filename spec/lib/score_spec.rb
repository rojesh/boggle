# frozen_string_literal: true

require 'rails_helper'
require 'score'

describe Score do
  let(:dummy_class) { Class.new { include Score } }
  subject(:calculator) { dummy_class.new.calculate(word) }

  describe 'calculate' do
    context 'When the word is invalid' do
      let(:word) { 'lkajsdlfjlsdlkj' }

      it 'returns 0' do
        expect(calculator).to eql(0)
      end
    end

    context 'When the word is valid and is of 3 characters' do
      let(:word) { 'sow' }

      it 'returns 3 point' do
        expect(calculator).to eql(3)
      end
    end

    context 'When the word is valid and is of 5 characters' do
      let(:word) { 'hello' }

      it 'returns 5' do
        expect(calculator).to eql(5)
      end
    end

    context 'When the word is valid and is of 6 characters' do
      let(:word) { 'abacus' }

      it 'returns 6' do
        expect(calculator).to eql(6)
      end
    end

    context 'When the word is valid and is of 7 characters' do
      let(:word) { 'abacist' }

      it 'returns 7' do
        expect(calculator).to eql(7)
      end
    end

    context 'When the word is valid and is of greater than 7 characters' do
      let(:word) { 'abandonment' }

      it 'returns 11' do
        expect(calculator).to eql(11)
      end
    end
  end
end
