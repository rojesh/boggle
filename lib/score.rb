# frozen_string_literal: true

module Score
  extend self

  def calculate(word)
    file_path = "#{Rails.root}/app/data/dict.txt"
    score = 0
    grep_result = File.foreach(file_path).grep(/^#{word}$/)

    if grep_result.present?
      score = if word.length < 2
        0
      else
        word.length
      end
    end
    score
  end
  end