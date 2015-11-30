<%! base = "" %><%namespace name="blocks" file="blocks.mako" inheritable="True"/>Content-Type: text/html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${self.attr.title}Table Football Ladder 3.4.4</title>

    <!-- Bootstrap -->
    <link href="${self.attr.base}css/bootstrap.min.css" rel="stylesheet">
    <link href="${self.attr.base}css/ladder.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="${self.attr.base}js/jquery.tablesorter.min.js"></script>
    <script type="text/javascript" src="${self.attr.base}js/jquery.flot.min.js"></script>
    <script type="text/javascript" src="${self.attr.base}js/jquery.flot.time.min.js"></script>
    <script type="text/javascript" src="${self.attr.base}js/jquery.floatThead.min.js"></script>

    <script src="${self.attr.base}js/react.min.js"></script>
    <script src="${self.attr.base}js/react-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
    <script type="text/babel" src="${self.attr.base}js/reactComponents.js"></script>
    <script src="${self.attr.base}js/classnames.js"></script>

    <script type="text/javascript" src="${self.attr.base}js/ladder.js"></script>
  </head>
  <body>
    <div id="headings"></div>
    <script type="text/babel">
      ReactDOM.render(
        <NavigationBar />,
        document.getElementById('headings')
      );
    </script>

    ${self.body()}
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="${self.attr.base}js/bootstrap.min.js"></script>
  </body>

</html>
