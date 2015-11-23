
var PlayerName = React.createClass({
  render: function() {
    var className = classNames(
      'playerName',
      this.props.colour
    );
    return (
      <a className={className} href={this.props.href}>
        {this.props.children}
      </a>
    );
  }
});

var GameAchievements = React.createClass({
  render: function() {
    var cups = this.props.achievements.map(function(ach) {
      return (
        <img src="img/trophy5_24.png" alt="Achievement unlocked!" title="Achievement unlocked!"/>
      );
    });
    return (
      <div className="gameAchievements">
        {cups}
      </div>
    );
  }
});

var SkillChange = React.createClass({
  render: function() {
    var className = classNames(
      'skillChange',
      'skill-change',
      this.props.colour
    );
    return (
      <span className={className}>
        {this.props.skillChange}
      </span>
    );
  }
});

var RankChange = React.createClass({
  render: function() {
    var className = classNames(
      'rankChange',
      'skill-change',
      this.props.colour
    );
    return (
      <span className={className}>
        {this.props.rankChange}
      </span>
    );
  }
});

var GameRecord = React.createClass({
  render: function() {
    return (
      <div className="gameRecord recent-game container-fluid">
        <div className="row recent-game-result">
          <div className="col-md-4">
            <PlayerName href={this.props.data.red.href} colour="red-player">{this.props.data.red.name}</PlayerName>
          </div>
          <div className="col-md-1">
            <GameAchievements achievements={this.props.data.red.achievements}/>
          </div>
          <div className="col-md-2">
            {this.props.data.red.score} - {this.props.data.blue.score}
          </div>
          <div className="col-md-1">
            <GameAchievements achievements={this.props.data.blue.achievements}/>
          </div>
          <div className="col-md-4">
            <PlayerName href={this.props.data.blue.href} colour="blue-player">{this.props.data.blue.name}</PlayerName>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <RankChange rankChange={this.props.data.red.rankChange} colour="skill-change-red"/>
          </div>
          <div className="col-md-2">
            <SkillChange skillChange={this.props.data.red.skillChange} colour="skill-change-red"/>
          </div>
          <div className="col-md-4">
            <a href={this.props.data.date}>
              {this.props.data.date}
            </a>
          </div>
          <div className="col-md-2">
            <SkillChange skillChange={this.props.data.blue.skillChange} colour="skill-change-blue"/>
          </div>
          <div className="col-md-2">
            <RankChange rankChange={this.props.data.blue.rankChange} colour="skill-change-blue"/>
          </div>
        </div>
      </div>
    );
  }
});
window.GameRecord = GameRecord;
