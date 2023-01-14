const color = '#FFFFFF';

const buttonContent = ({ node, state }) => {
    return `<div style="px;color:#716E7B;border-radius:5px;padding:4px;font-size:10px;margin:auto auto;background-color:white;border: 1px solid #E4E2E9"> <span style="font-size:9px">${
    node.children
        ? `<i class="fas fa-angle-up"></i>`
        : `<i class="fas fa-angle-down"></i>`
    }</span> ${node.data._directSubordinates}  </div>`;
}

const linkUpdate = (d, i, arr) => {
    console.log(d.data)
    d3.select(this)
    .attr('stroke', (d) =>
        d.data._upToTheRootHighlighted ? '#152785' : '#E4E2E9'
    )
    .attr('stroke-width', (d) =>
        d.data._upToTheRootHighlighted ? 5 : 1
    );
    if (d.data._upToTheRootHighlighted) {
        d3.select(this).raise();
    }
}

const getProfilePic = (d, i, arr, state) => {
    if (d.data.imageUrl !== "") {
        return `
        <div style="background-color:${color};position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" ></div>
        <img src=" ${
            d.data.imageUrl
        }" style="position:absolute;margin-top:-25px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;" />
        `
    }
    return ""
}

const getSubortinates = (d, i, arr, state) => {
    if (d.data._totalSubordinates > 0) {
        return `
        <div style="color:#08011E;position:absolute;right:20px;top:17px;font-size:10px;"> Oversees: ${
            d.data._totalSubordinates
        } </div>
        `
    }
    return ""
}

const getHeadline = (d, i, arr, state) => {
    if (d.data._totalSubordinates > 0) {
        return `
        <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
            d.data.area
        } </div>
        `
    }
    return `
    <div style="color:#716E7B;margin-left:20px;margin-top:3px;font-size:10px;"> ${
        d.data.positionName
    } </div>
    `
}

const nodeContent = (d, i, arr, state) => {
    return `
        <div style="font-family: 'Inter', sans-serif;background-color:${color}; position:absolute;margin-top:-1px; margin-left:-1px;width:${d.width}px;height:${d.height}px;border-radius:10px;border: 1px solid #E4E2E9">
            ${getProfilePic(d, i, arr, state)}
        
            ${getSubortinates(d, i, arr, state)}

            <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:32px"> ${
                d.data.name
            } </div>
            
            ${getHeadline(d, i, arr, state)}
        </div>
    `;
}

async function renderOrgChart(data) {
    var chart = new d3.OrgChart()
        .container('.chart-container')
        .data(data)
        .nodeHeight((d) => 85)
        .nodeWidth((d) => 260)
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 25)
        .compactMarginPair((d) => 50)
        .neighbourMargin((a, b) => 25)
        .siblingsMargin((d) => 25)
        .buttonContent(buttonContent)
        //.linkUpdate(linkUpdate)
        .nodeContent(nodeContent)
        .render();
}
