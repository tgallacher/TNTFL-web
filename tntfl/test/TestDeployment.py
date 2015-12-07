import urllib2
import unittest
import urlparse
import json
import os

class Deployment(unittest.TestCase):
    urlBase = os.path.join('http://www/~tlr/', os.path.split(os.getcwd())[1]) + "/"
    _username = 'tlr'
    _password = ''

    def _page(self, page):
        return urlparse.urljoin(self.urlBase, page)

class Pages(Deployment):
    def testIndexReachable(self):
        self._testPageReachable('')

    def testAchievementsReachable(self):
        self._testPageReachable('achievements.cgi')

    def testApiReachable(self):
        self._testPageReachable('api/')

    def testGameReachable(self):
        self._testPageReachable('game/1223308996/')

    def testDeleteAuthenticationRequired(self):
        try:
            self._testPageReachable('game/1223308996/delete')
        except urllib2.HTTPError as e:
            self.assertEqual(e.code, 401)

    def testDeleteReachable(self):
        password_mgr = urllib2.HTTPPasswordMgrWithDefaultRealm()
        password_mgr.add_password(None, self.urlBase, self._username, self._password)
        handler = urllib2.HTTPBasicAuthHandler(password_mgr)
        opener = urllib2.build_opener(handler)
        response = opener.open(self._page('game/1223308996/delete')).read()
        self._testResponse(response)

    def testHeadToHeadReachable(self):
        self._testPageReachable('headtohead/jrem/sam/')

    def testPlayerReachable(self):
        self._testPageReachable('player/jrem/')

    def testPlayerGamesReachable(self):
        self._testPageReachable('player/jrem/games/')

    def testSpeculateReachable(self):
        self._testPageReachable('speculate/')

    def testStatsReachable(self):
        self._testPageReachable('stats/')

    def _testPageReachable(self, page):
        response = urllib2.urlopen(self._page(page)).read()
        self._testResponse(response)

    def _testResponse(self, response):
        self.assertTrue("<!DOCTYPE html>" in response)
        self.assertTrue("Traceback (most recent call last):" not in response)

class Api(Deployment):

    def testGameJson(self):
        page = 'game/1223308996/json'
        response = self._getJsonFrom(page)

        self.assertEqual(response['red']['name'], 'jrem')
        self.assertEqual(response['red']['href'], '../../player/jrem/json')
        self.assertEqual(urlparse.urljoin(self._page(page), response['red']['href']), urlparse.urljoin(self.urlBase, "player/jrem/json"))
        self.assertEqual(response['red']['score'], 10)
        self.assertEqual(response['red']['skillChange'], 14.8698309141)
        self.assertEqual(response['red']['rankChange'], 0)
        self.assertEqual(response['red']['newRank'], 15)
        redAchievements = response['red']['achievements']
        self.assertEqual(len(redAchievements), 3)
        self.assertEqual(redAchievements[0]['name'], "Flawless Victory")
        self.assertEqual(redAchievements[0]['description'], "Beat an opponent 10-0")
        self.assertEqual(redAchievements[1]['name'], "Early Bird")
        self.assertEqual(redAchievements[1]['description'], "Play and win the first game of the day")
        self.assertEqual(redAchievements[2]['name'], "Pok&#233;Master")
        self.assertEqual(redAchievements[2]['description'], "Collect all the scores")

        self.assertEqual(response['blue']['name'], 'kjb')
        self.assertEqual(response['blue']['href'], '../../player/kjb/json')
        self.assertEqual(response['blue']['score'], 0)
        self.assertEqual(response['blue']['skillChange'], -14.8698309141)
        self.assertEqual(response['blue']['rankChange'], 0)
        self.assertEqual(response['blue']['newRank'], 14)
        self.assertEqual(response['blue']['achievements'], [])

        self.assertEqual(response['positionSwap'], False)
        self.assertEqual(response['date'], 1223308996)

    def testPlayerJson(self):
        page = 'player/ndt/json'
        response = self._getJsonFrom(page)
        self.assertEqual(response['name'], "ndt")
        self.assertEqual(response['rank'], -1)
        self.assertEqual(response['active'], False)
        self.assertEqual(response['skill'], 65.7308777725)
        self.assertEqual(response['overrated'], -20.2998078551)
        self.assertEqual(urlparse.urljoin(self._page(page), response['games']['href']), urlparse.urljoin(self.urlBase, "player/ndt/games/json"))
        self.assertEqual(response['total']['for'], 2895)
        self.assertEqual(response['total']['against'], 2005)
        self.assertEqual(response['total']['games'], 490)
        self.assertEqual(response['total']['wins'], 286)
        self.assertEqual(response['total']['losses'], 96)
        self.assertEqual(response['total']['gamesToday'], 0)

    def testPlayerGamesJsonReachable(self):
        response = self._getJsonFrom('player/ndt/games/json')
        self.assertEqual(len(response), 490)

    def testLadderJsonReachable(self):
        response = self._getJsonFrom('ladder/json')

    def testRecentJsonReachable(self):
        response = self._getJsonFrom('recent/json')

    def testGamesJson(self):
        page = 'games.cgi?view=json;from=1120830176;to=1120840777'
        response = self._getJsonFrom(page)
        self.assertEqual(len(response), 3)

        self.assertEqual(response[0]['red']['name'], 'lefh')
        self.assertEqual(response[0]['red']['href'], 'player/lefh/json')
        self.assertEqual(urlparse.urljoin(self._page(page), response[0]['red']['href']), urlparse.urljoin(self.urlBase, "player/lefh/json"))
        self.assertEqual(response[0]['red']['score'], 5)
        self.assertEqual(response[0]['red']['skillChange'], -0.497657033239)
        self.assertEqual(response[0]['red']['rankChange'], 0)
        self.assertEqual(response[0]['red']['newRank'], 2)
        self.assertEqual(response[0]['red']['achievements'], [])

        self.assertEqual(response[0]['blue']['name'], 'pdw')
        self.assertEqual(response[0]['blue']['href'], 'player/pdw/json')
        self.assertEqual(response[0]['blue']['score'], 5)
        self.assertEqual(response[0]['blue']['skillChange'], 0.497657033239)
        self.assertEqual(response[0]['blue']['rankChange'], 0)
        self.assertEqual(response[0]['blue']['newRank'], 3)
        self.assertEqual(response[0]['blue']['achievements'], [])

        self.assertEqual(response[0]['positionSwap'], False)
        self.assertEqual(response[0]['date'], 1120830176)

        self.assertEqual(response[1]['date'], 1120834874)
        self.assertEqual(response[2]['date'], 1120840777)

    def testPositionSwap(self):
        page = 'game/1443785561/json'
        response = self._getJsonFrom(page)

        self.assertEqual(response['positionSwap'], True)
        self.assertEqual(response['date'], 1443785561)

    def testLadderReachable(self):
        self._testPageReachable('ladder.cgi')

    def testRecentReachable(self):
        self._testPageReachable('recent.cgi')

    def _getJsonFrom(self, page):
        response = urllib2.urlopen(self._page(page))
        return json.load(response)

    def _testPageReachable(self, page):
        response = urllib2.urlopen(self._page(page))
        self.assertTrue("Traceback (most recent call last):" not in response.read())
