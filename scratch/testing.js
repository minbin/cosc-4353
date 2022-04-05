function setup(snapshot) {
    let html = ''
    let data = null

    console.log(snapshot.docs[0].data())//can use .data().city to get city
    data = snapshot.docs[0].data()
    //docRefId = snapshot.docs[0].id
    html += `
					<div>
						<h5>Full Name</h5>
						<p>[ ${data.fullName} ]</p>
						<h5>Primary Address</h5>
						<p>[ ${data.primaryAddress} ]</p>
						<h5>Secondary Address</h5>
						<p>[ ${data.secondaryAddress} ]</p>
						<h5>City</h5>
						<p>[ ${data.city} ]</p>
						<h5>State</h5>
						<p>[ ${data.state} ]</p>
						<h5>Zipcode</h5>
						<p>[ ${data.zipcode} ]</p>
					</div>
				`
    let ret = [html, snapshot.docs[0].id]
    return ret
}
module.exports.setup = setup

function sum(a,b) {
    return a+b
}
module.exports.sum = sum