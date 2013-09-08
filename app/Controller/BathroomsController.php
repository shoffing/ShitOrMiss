<?php
class BathroomsController extends AppController {

       /* public function beforeFilter()
        {
                parent::beforeFilter();
                $this->Auth->allow('upload'); //Allows anyone to upload files
        } */

	public function index()
	{
		$this->set('bathrooms', $this->Bathroom->getBathrooms());
	}

        public function upload()
        {
		$this->autoRender = false;

        	if ($this->request->is('post'))
                {
			CakeLog::write('debug', $this->request->data);

			if ($this->Bathroom->save($this->request->data))
				$this->Session->setFlash("", "bathroomSaveSuccess");
			else
				$this->Session->setFlash("", "bathroomSaveFailure");
                }
		
		$this->redirect(array('controller' => 'bathrooms', 'action' => 'index'));
        }
}
