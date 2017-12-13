class Api::V1::SongsController < ApiController

  def index
    songs = Song.all
    render json: songs
  end

  private

  def song_params
    params.require(:song).permit(
      :title,
      :artist,
      :lyrics
    )
  end
end
