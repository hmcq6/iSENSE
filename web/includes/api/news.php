<?php

function createNewsItem($token, $title, $content, $publish = 1) {
	global $db;
	
	$uid = $token['uid'];
	$session = $token['session'];
	
	$db->query("INSERT INTO news (`author_id`, `title`, `pubDate`, `content`, `published`) VALUES({$uid}, '{$title}', NOW(), '{$content}', {$publish})");
	
	if($db->numOfRows) {
		$id = $db->lastInsertId();
		
		$url = 'http://isense.cs.uml.edu/news.php?id=' . $id;
		publishToTwitter('Latest News: "'.$title.'" - ' . $url); 
		
		$title = 'iSENSE News - ' . $title;
		$content = substr($content, 0, 150) . '...';
		publishToDelicious($title, $url, $content,  array('isensenews', 'isense', 'education'));
		
		return $id;
	}
	
	return false;
}

function getArticle($id) {
	global $db;

	$output = $db->query("SELECT news.*, users.* FROM news, users WHERE news.article_id = {$id} AND users.user_id = news.author_id ");
	
	if($db->numOfRows) {
		return $output;
	}
	
	return false;
}

function publishArticle($id) {
	global $db;
	
	$output = $db->query("UPDATE news SET news.published = 1 WHERE news.article_id = {$id}");
	
	if($db->numOfRows) {
		return true;
	}
	
	return false;
}

function deleteArticle($id) {
	global $db;
	
	$output = $db->query("DELETE FROM news WHERE news.article_id = {$id}");
	
	if($db->numOfRows) {
		return true;
	}
	
	return false;
}

/*
function getNews($limit = 5) {
	global $db;
	
	$output = $db->query("SELECT news.*, users.* FROM news, users WHERE news.published = 1 AND users.user_id = news.author_id LIMIT 0, {$limit}");
	
	if($db->numOfRows) {
		return $output;
	}
	
	return false;
}
*/

function getNews($limit = 5) {
    $url = "http://".$_SERVER['SERVER_NAME']."/blog/feed?post_type=post";
    $output = array();
    $count = 0;
//    echo $_SERVER['SERVER_NAME'];    
    $contents = file_get_contents($url);
//    print_r($contents);
    if($contents != FALSE) {
        $xml = simplexml_load_string($contents);
        
        foreach($xml->channel->item as $i) {
            $pubDate = (string) $i->pubDate;
            $pubDate = strtotime($pubDate);


            if($count < $limit) {
                $output[] = array(
                  "title" => (string) $i->title,
                  "link" => (string) $i->link,
                  "date" => $pubDate
                );
            }
            else {
                break;
            }
        }
    }
    
    return $output;
}

?>