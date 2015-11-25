function theTime(epoch) {
  var date = new Date(epoch * 1000);
  return (
    date.getFullYear() + "-" +
    (date.getMonth() + 1) + "-" +
    date.getDate() + " " +
    date.getHours() + ":" +
    date.getMinutes()
  );
}

var PlayerName = React.createClass({
  render: function() {
    var className = classNames(
      'playerName',
      this.props.colour,
      this.props.yellow ? 'yellow-stripe' : '',
      this.props.width
    );
    return (
      <div className={className}>
        <a href={this.props.href}>
          {this.props.children}
        </a>
      </div>
    );
  }
});

var AchievementsSummary = React.createClass({
  render: function() {
    var className = classNames(
      'achievementsSummary',
      this.props.yellow ? 'yellow-stripe' : '',
      this.props.width
    );
    var cups = this.props.achievements.map(function(ach) {
      return (
        <img src="img/trophy5_24.png" alt="Achievement unlocked!" title="Achievement unlocked!"/>
      );
    });
    return (
      <div className={className}>
        {cups}
      </div>
    );
  }
});

var GameScore = React.createClass({
  render: function() {
    var className = classNames(
      'gameScore',
      this.props.yellow ? 'yellow-stripe' : '',
      this.props.width
    );
    return (
      <div className={className}>
        {this.props.redScore} - {this.props.blueScore}
      </div>
    );
  }
});

var GameTime = React.createClass({
  render: function() {
    return (
      <a href={this.props.date}>
        {theTime(this.props.date)}
      </a>
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
        +{(this.props.skillChange).toFixed(3)}
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
        +{this.props.rankChange}
      </span>
    );
  }
});

var GameSummary = React.createClass({
  render: function() {
    var redStripe = this.props.game.red.score == 10 && this.props.game.blue.score == 0;
    var blueStripe = this.props.game.red.score == 0 && this.props.game.blue.score == 10;
    return (
      <div className="gameSummary recent-game container-fluid">
        {this.props.game.deleted ? <p className="bg-danger">This game was deleted by {this.props.game.deleted.by} at {theTime(this.props.game.deleted.at)}</p> : null}
        <div className="row recent-game-result">
          <PlayerName href={this.props.game.red.href} colour="red-player" yellow={redStripe} width="col-md-4">
            {this.props.game.red.name}
          </PlayerName>
          <AchievementsSummary achievements={this.props.game.red.achievements} yellow={redStripe} width="col-md-1"/>
          <GameScore redScore={this.props.game.red.score} blueScore={this.props.game.blue.score} width="col-md-2" yellow={redStripe || blueStripe}/>
          <AchievementsSummary achievements={this.props.game.blue.achievements} yellow={blueStripe} width="col-md-1"/>
          <PlayerName href={this.props.game.blue.href} colour="blue-player" yellow={blueStripe} width="col-md-4">
            {this.props.game.blue.name}
          </PlayerName>
        </div>
        <div className="row">
          <div className="col-md-2">
            {this.props.game.red.rankChange != 0 ? <RankChange rankChange={this.props.game.red.rankChange} colour="skill-change-red"/> : null}
          </div>
          <div className="col-md-2">
            {this.props.game.red.skillChange > 0 ? <SkillChange skillChange={this.props.game.red.skillChange} colour="skill-change-red"/> : null}
          </div>
          <div className="col-md-4">
            <GameTime date={this.props.game.date}/>
          </div>
          <div className="col-md-2">
            {this.props.game.blue.skillChange >= 0 ? <SkillChange skillChange={this.props.game.blue.skillChange} colour="skill-change-blue"/> : null}
          </div>
          <div className="col-md-2">
            {this.props.game.blue.rankChange != 0 ? <RankChange rankChange={this.props.game.blue.rankChange} colour="skill-change-blue"/> : null}
          </div>
        </div>
      </div>
    );
  }
});
window.GameSummary = GameSummary;


var PageNavigation = React.createClass({
  render: function() {
    return (
      <div className="pageNavigation">
        <ul className="nav navbar-nav">
          <li><a href="">Home</a></li>
          <li><a href="stats/">Stats</a></li>
          <li><a href="speculate/">Speculate</a></li>
          <li><a href="api/">API</a></li>
        </ul>
      </div>
    );
  }
});

var AddGameForm = React.createClass({
  getInitialState: function() {
    return {redPlayer: '', redScore: '', bluePlayer: '', blueScore: ''};
  },
  handleRedPlayerChange: function(e) {
    this.setState({redPlayer: e.target.value});
  },
  handleRedScoreChange: function(e) {
    this.setState({redScore: e.target.value, blueScore: 10 - e.target.value});
  },
  handleBluePlayerChange: function(e) {
    this.setState({bluePlayer: e.target.value});
  },
  handleBlueScoreChange: function(e) {
    this.setState({blueScore: e.target.value});
  },
  render: function() {
    return (
      <div className="addGameForm">
        <form className="navbar-form navbar-right game-entry" method="post" action="game/add/">
          <div className="form-group">
            <input
              type="text"
              name="redPlayer"
              className="form-control red player"
              placeholder="Red"
              value={this.state.redPlayer}
              onChange={this.handleRedPlayerChange}
            /> <input
              type="text"
              name="redScore"
              className="form-control red score"
              maxLength="2"
              placeholder="0"
              value={this.state.redScore}
              onChange={this.handleRedScoreChange}
            /> - <input
              type="text"
              name="blueScore"
              className="form-control blue score"
              maxLength="2"
              placeholder="0"
              value={this.state.blueScore}
              onChange={this.handleBlueScoreChange}
            /> <input
              type="text"
              name="bluePlayer"
              className="form-control blue player"
              placeholder="Blue"
              value={this.state.bluePlayer}
              onChange={this.handleBluePlayerChange}
            />
          </div>
          <button type="submit" className="btn btn-default">
            Add game <span className="glyphicon glyphicon-triangle-right"/>
          </button>
        </form>
      </div>
    );
  }
});

var NavigationBar = React.createClass({
  render: function() {
    return (
      <div className="navigationBar">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <p className="navbar-text tntfl-header">Table Football Ladder</p>
            <PageNavigation/>
            <AddGameForm/>
          </div>
        </nav>
      </div>
    );
  }
});
window.NavigationBar = NavigationBar;

var JsonLink = React.createClass({
  render: function() {
    return (
      <div className="jsonLink">
        <p><a href="json">This game as JSON</a></p>
      </div>
    );
  }
});

var Achievement = React.createClass({
  render: function() {
    return (
      <div className="achievement">
        <div className="panel panel-default panel-achievement">
          <div className="panel-heading">
            <h3 className="panel-title">{this.props.achievement.name}</h3>
          </div>
          <div className="panel-body achievement-${ach.__name__}">
            {this.props.achievement.description}
          </div>
        </div>
      </div>
    );
  }
});

var Achievements = React.createClass({
  render: function() {
    var achievements = this.props.achievements.map(function(ach) {
      return (
        <Achievement achievement={ach} />
      );
    });
    return (
      <div className="achievements">
        <div className="col-md-4">
          {achievements}
        </div>
      </div>
    );
  }
});

var Fact = React.createClass({
  render: function() {
    return (
      <div className="fact">
        {this.props.fact}
        <br/>
      </div>
    );
  }
});

var Punditry = React.createClass({
  render: function() {
    var facts = this.props.facts.map(function(fact) {
      return (
        <Fact fact={fact}/>
      );
    });
    return (
      <div className="punditry">
        <div className="panel panel-default ">
          <div className="panel-heading">
            <h3 className="panel-title">Punditry</h3>
          </div>
          <div className="panel-body">
            {facts}
          </div>
        </div>
      </div>
    );
  }
});

var GameDetails = React.createClass({
  render: function() {
    return (
      <div className="gameDetails">
        <div className="recent-game container-fluid">
          <div className="row achievements">
            <Achievements achievements={this.props.game.red.achievements}/>
            <div className="col-md-4">
              {this.props.game.punditry && this.props.game.punditry.length ? <Punditry facts={this.props.game.punditry} /> : null}
            </div>
            <Achievements achievements={this.props.game.blue.achievements}/>
          </div>
        </div>
        <JsonLink/>
        {!this.props.game.deleted ? <a href="delete" className="btn btn-danger pull-right"><span className="glyphicon glyphicon-lock"></span> Delete game</a> : null}
      </div>
    );
  }
});
window.GameDetails = GameDetails;
