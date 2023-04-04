const home = (req, res) => {
    res.send(`<h1>CAPTAIN'S LOG</h1>
    <h2>TOP SECRET</h2>
    <p>Seriously, please be cool about this...</p>
    <a href="/logs">Open Logbook</a><br>
    <a href="/foodlogs">Open Food Logbook</a>`)
}

module.exports = {
    home
}