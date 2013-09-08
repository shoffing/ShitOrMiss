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
			$countType = $this->request->data['Bathroom']['shit_or_miss'];
			$lat = $this->request->data['Bathroom']['lat'];
			$long = $this->request->data['Bathroom']['long'];

			//Increment Shit Count
			if ($countType == 0)
				$this->request->data['Bathroom']['num_shits'] = 1;
			else if ($countType == 1) //Increment Miss Count
				$this->request->data['Bathroom']['num_misses'] = 1;

			if ($this->Bathroom->save($this->request->data))
				$this->Session->setFlash($lat . "|" . $long, "bathroomSaveSuccess");
			else
				$this->Session->setFlash($lat . "|" . $long, "bathroomSaveFailure");
                }
		$this->redirect(array('controller' => 'bathrooms', 'action' => 'index'));
        }

	public function updateCount()
	{
		$this->autoRender = false;
		
		if ($this->request->is('post'))
		{
			//include 'chromephp/ChromePhp.php';
			$id = $this->request->data['Bathroom']['bathroom_id'];
			$countType = $this->request->data['Bathroom']['shit_or_miss'];
			$lat = $this->request->data['Bathroom']['lat'];
			$long = $this->request->data['Bathroom']['long'];
	
			$bathroom = $this->Bathroom->find('first', array('conditions' => array('Bathroom.bathroom_id' => $id)));	
				
			//Increment Shit Count
			if ($countType == 0)
			{
				$newCount = $bathroom['Bathroom']['num_shits'] + 1;
				$this->Bathroom->query("UPDATE bathrooms SET num_shits = " . $newCount . " WHERE bathroom_id = " . $id);
			}
			else if ($countType == 1) //Increment Miss Count
			{
				$newCount = $bathroom['Bathroom']['num_misses'] + 1;
				$this->Bathroom->query("UPDATE bathrooms SET num_misses = " . $newCount . " WHERE bathroom_id = " . $id);
			}	
		}
		$this->Session->setFlash($lat . "|" . $long, "bathroomSaveSuccess");
		$this->redirect(array('controller' => 'bathrooms', 'action' => 'index'));
	}
}
