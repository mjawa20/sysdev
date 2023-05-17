SELECT
  name,
  mode,
  average,
  created
FROM
  (
    SELECT
      name,
      emotion,
      (
        SELECT
          avg(score)
        FROM
          emotions
        WHERE
          name = e.name
          AND created = e.created
        ORDER BY
          count(emotion) DESC
      ) AS average,
      created,
      (
        SELECT
          emotion
        FROM
          emotions
        WHERE
          name = e.name
          AND created = e.created
        GROUP BY
          emotion
        ORDER BY
          count(emotion) DESC
        LIMIT
          1
      ) AS mode
    FROM
      emotions e
    GROUP BY
      name,
      created
  ) AS tab