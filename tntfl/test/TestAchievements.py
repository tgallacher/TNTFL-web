import os
import unittest
from tntfl.player import Player
from tntfl.game import Game
from tntfl.ladder import TableFootballLadder
from tntfl.achievements import *

class TestAchievements(unittest.TestCase):
    def testAgainstTheOdds_Under50(self):
        ach = AgainstTheOdds()
        player = Player("foo")
        player.elo = 0
        opponent = Player("bar")
        opponent.elo = 49
        game = Game(player.name, 10, opponent.name, 0, 0)
        game.skillChangeToBlue = -50
        player.game(game)
        opponent.game(game)
        result = ach.applies(player, game, opponent, None)
        self.assertFalse(result)

    def testAgainstTheOdds_Under50_2(self):
        ach = AgainstTheOdds()
        player = Player("foo")
        player.elo = 0
        opponent = Player("bar")
        opponent.elo = 49
        game = Game(opponent.name, 0, player.name, 10, 0)
        game.skillChangeToBlue = 10
        player.game(game)
        opponent.game(game)
        result = ach.applies(player, game, opponent, None)
        self.assertFalse(result)

    def testAgainstTheOdds_Over50Lose(self):
        ach = AgainstTheOdds()
        player = Player("foo")
        player.elo = 0
        opponent = Player("bar")
        opponent.elo = 50
        game = Game(player.name, 0, opponent.name, 10, 0)
        game.skillChangeToBlue = 50
        player.game(game)
        opponent.game(game)
        result = ach.applies(player, game, opponent, None)
        self.assertFalse(result)

    def testAgainstTheOdds_Over50(self):
        ach = AgainstTheOdds()
        player = Player("foo")
        player.elo = 0
        opponent = Player("baz")
        opponent.elo = 50
        game = Game(player.name, 10, opponent.name, 0, 0)
        game.skillChangeToBlue = -50
        player.game(game)
        opponent.game(game)
        result = ach.applies(player, game, opponent, None)
        self.assertTrue(result)

    def testAgainstTheOdds_Over50_2(self):
        ach = AgainstTheOdds()
        player = Player("foo")
        player.elo = 0
        opponent = Player("baz")
        opponent.elo = 50
        game = Game(opponent.name, 0, player.name, 10, 0)
        game.skillChangeToBlue = 10
        player.game(game)
        opponent.game(game)
        result = ach.applies(player, game, opponent, None)
        self.assertTrue(result)

__location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
class Functional(unittest.TestCase):
    def testEarlyBird(self):
        ladder = TableFootballLadder(os.path.join(__location__, "testLadder.txt"), False)
        player = Player("foo")
        opponent = Player("baz")
        game = Game(opponent.name, 0, player.name, 10, 6000000003)
        ladder.addGame(game)

        sut = EarlyBird()
        result = sut.applies(player, game, opponent, ladder)
        self.assertTrue(result)
        result = sut.applies(opponent, game, player, ladder)
        self.assertFalse(result)

    def testEarlyBirdFirstGame(self):
        ladder = TableFootballLadder(os.path.join(__location__, "emptyLadder.txt"), False)
        player = Player("foo")
        opponent = Player("baz")
        game = Game(opponent.name, 0, player.name, 10, 0)
        ladder.addGame(game)

        sut = EarlyBird()
        result = sut.applies(player, game, opponent, ladder)
        self.assertTrue(result)
        result = sut.applies(opponent, game, player, ladder)
        self.assertFalse(result)
