<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <title>UMD test</title>
        <script src="dist/bundle.umd.js"></script>
    </head>
    <body>

        <script>

            let validator = new ObjectDataValidator({
                data : {name : 'Anjan'},
                rules : []
            });

            console.log(validator.isValidWithDateFns('10-12-2003','dd-MM-yyyy'));

        </script>

    </body>
</html>