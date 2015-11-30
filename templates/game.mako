<%page args="game, base, punditryAvailable=False"/>
<%namespace name="blocks" file="blocks.mako" />

<div id="content-${game.time}"></div>
<script type="text/babel">
  var result = ${blocks.render("json/game", game=game, base=base)}
  ReactDOM.render(
    <GameSummary game={result}/>,
    document.getElementById('content-${game.time}')
  );
</script>
