/**
 * Created by sarin on 11/26/16.
 */
exports.typeAheadSubjectAreas = function(req, res){
    var val = req.params.val;

    //return status 200 with subject area data if exists
    var subject_areas_exist = true;
    if(subject_areas_exist){
        return  res.status(200).send({ subjects: ['Computer Science','Mathematics (all)', 'Electrical and Electronic Engineering'] });
    }
    //return status 500 if no subject areas start with val
    else{
        return res.status(500).send({error: "No subject areas found"});
    }
};
