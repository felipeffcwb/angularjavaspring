package com.projectstudy.projectstudy.controller;

import com.projectstudy.projectstudy.model.Register;
import com.projectstudy.projectstudy.repository.RegisterRepository;
import com.projectstudy.projectstudy.utils.StatusRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(origins = "http://localhost:8081")
@CrossOrigin(origins = "http://fe75a36c.ngrok.io")
@RequestMapping("/Registers")
public class RegistersController {

    //Dependecy injection from DAO
    @Autowired
    private RegisterRepository _registerRepository;

    //Get all of the Registers on the database
    //Registers/
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<Register> getAllList(){
        return _registerRepository.findAll();
    }

    //Get a one register by id
    //Registers/get/1
    @RequestMapping(value = "/get/{id}", method = RequestMethod.GET)
    public Optional<Register> getById(@PathVariable("id") int id) {
            return _registerRepository.findById(id);
    }

    //Add entities in database, receive from angular interface by http POST request
    //Registers/add
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public StatusRegister insertNewPeople(@RequestBody Register register) {
        try {
            if (register != null && _registerRepository.findByEmail(register.getEmail()) == null){
                _registerRepository.save(register);
                return StatusRegister.SUCCESS;
            } else if (_registerRepository.findByEmail(register.getEmail()) != null){
                return StatusRegister.EMAILEXIST;
            }
            return StatusRegister.FAIL;
        } catch (Exception e){
            return StatusRegister.ERROR;
        }

    }

    //Delete registers from database by id
    //Registers/delete/1
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public StatusRegister deletePeople(@PathVariable("id") int id) {
        try {
            if (id != 0){
                _registerRepository.deleteById(id);
                return StatusRegister.SUCCESS;
            }
            return StatusRegister.FAIL;
        } catch (Exception e){
            return StatusRegister.ERROR;
        }


    }

    //Update registers into database by id, receive entity from angular interface and replace.
    //Registers/update/1
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public StatusRegister changePeople(@PathVariable("id") int id, @RequestBody Register register) {

        try {
            if (id != 0){
            Register oldRegister = _registerRepository.getOne(id);
            oldRegister = register;
            oldRegister.setId(id);
                _registerRepository.save(oldRegister);
                return StatusRegister.SUCCESS;
            }
            return StatusRegister.FAIL;
        } catch (Exception e) {
            return StatusRegister.ERROR;
        }
    }

}
