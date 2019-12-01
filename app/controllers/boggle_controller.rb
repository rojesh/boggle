class BoggleController < ApplicationController
  include Score

  def index
  end

  def score
    score = calculate(params['word'])
    render json: score
  end
  end