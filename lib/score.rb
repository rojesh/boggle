# frozen_string_literal: true

module Score
  extend self

  def calculate(word)
    file_path = "#{Rails.root}/app/data/dict.txt"
    score = 0
    grep_result = File.foreach(file_path).grep(/^#{word}$/)

    if grep_result.present?
      score = if word.length < 3
        0
      elsif word.length == 3 || word.length == 4
        1
      elsif word.length == 5
        2
      elsif word.length == 6
        3
      elsif word.length == 7
        4
      else
        11
      end
    end
    score
  end
  end