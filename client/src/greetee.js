export default function Greetee(props) {
    //console.log("props in gretee: ", props);
    return <span>{props.firstName || "AWESOME_USER"}</span>;
}
