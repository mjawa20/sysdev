SELECT name, 
	(
		SELECT emotion 
		FROM emotions
		WHERE name = e.name 
		GROUP BY emotion	
		ORDER BY count(emotion) 
		DESC LIMIT 1  
	) AS mode 
FROM emotions e GROUP BY name 